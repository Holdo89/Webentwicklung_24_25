// 📦 Erforderliche Pakete importieren
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3001;
const SECRET = "dein_geheimer_schluessel";

// 📧 Mailtrap-Zugang (nur für Tests, später durch echten SMTP ersetzen)
const MAIL_USER = "40e70e0246ed42";
const MAIL_PASS = "000f175fddfeaf";

// 🌐 Middleware aktivieren
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(bodyParser.json());

// 🔌 MySQL-Datenbank verbinden
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sc-cars",
});
db.connect((err) =>
  err ? console.error("❌ DB Fehler:", err) : console.log("✅ Verbunden mit MySQL")
);

// 📧 Mailer konfigurieren
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: { user: MAIL_USER, pass: MAIL_PASS },
});

//
// ✅ Registrierung
//
app.post("/register", async (req, res) => {
  const { vorname, nachname, email, passwort } = req.body;
  if (!vorname || !nachname || !email || !passwort)
    return res.status(400).json({ error: "Alle Felder erforderlich." });

  try {
    const hashed = await bcrypt.hash(passwort, 10);
    const sql = "INSERT INTO benutzer (vorname, nachname, email, passwort) VALUES (?, ?, ?, ?)";
    db.query(sql, [vorname, nachname, email, hashed], (err) => {
      if (err) return res.status(500).json({ error: "Fehler bei Registrierung." });
      res.status(200).json({ message: "Registrierung erfolgreich." });
    });
  } catch {
    res.status(500).json({ error: "Serverfehler." });
  }
});

//
// ✅ Login
//
app.post("/login", (req, res) => {
  const { email, passwort } = req.body;
  const sql = "SELECT * FROM benutzer WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ error: "Benutzer nicht gefunden." });

    const user = results[0];
    const match = await bcrypt.compare(passwort, user.passwort);
    if (!match) return res.status(401).json({ error: "Falsches Passwort." });

    const token = jwt.sign({ id: user.id, vorname: user.vorname }, SECRET, { expiresIn: "2h" });
    res.status(200).json({
      message: "Login erfolgreich",
      token,
      id: user.id,
      vorname: user.vorname,
      nachname: user.nachname,
    });
  });
});

//
// ✅ Kontaktformular inkl. Mailversand
//
app.post("/kontakt", (req, res) => {
  const { name, email, nachricht } = req.body;

  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err) => {
    if (err) return res.status(500).json({ error: "Speicherfehler." });

    const mailOptions = {
      from: '"SC Cars Kontakt" <kontakt@sccars.at>',
      to: "admin@example.com",
      subject: "Neue Kontaktanfrage",
      text: `Von: ${name} <${email}>\n\n${nachricht}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).json({ error: "E-Mail-Versand fehlgeschlagen." });
      res.status(200).json({ message: "Gespeichert & gesendet." });
    });
  });
});

//
// ✅ Buchung mit Validierung, Zeitprüfung & HTML-Mail
//
app.post("/buchung", (req, res) => {
  const { datum, angebot, uhrzeit, benutzer_id } = req.body;
  if (!datum || !angebot || !uhrzeit || !benutzer_id)
    return res.status(400).json({ error: "Alle Felder erforderlich." });

  const maxZeitMap = {
    'Innenreinigung': '17:30',
    'Außenreinigung': '17:30',
    'Innen- und Außenreinigung': '17:30',
    'Kundenberatung': '17:30',
    'Politur': '15:00',
    'Felgenreparatur': '16:00',
    'Tiefenreinigung-Sitze': '16:00',
    'Sonstiges': '16:00',
  };

  const abstandMap = {
    'Innenreinigung': 2,
    'Außenreinigung': 2,
    'Innen- und Außenreinigung': 3,
    'Politur': 5,
    'Felgenreparatur': 3.5,
    'Tiefenreinigung-Sitze': 3.5,
    'Kundenberatung': 1.5,
    'Sonstiges': 1.5,
  };

  if (uhrzeit > maxZeitMap[angebot]) {
    return res.status(400).json({
      error: `Diese Leistung ist nur bis ${maxZeitMap[angebot]} buchbar.`,
    });
  }

  const abstandStunden = abstandMap[angebot];
  const zielZeit = new Date(`${datum}T${uhrzeit}:00`);
  const startZeit = new Date(zielZeit.getTime() - abstandStunden * 60 * 60 * 1000);
  const endZeit = new Date(zielZeit.getTime() + abstandStunden * 60 * 60 * 1000);

  const conflictQuery = `
    SELECT * FROM buchungen
    WHERE datum = ? AND TIME(uhrzeit) BETWEEN ? AND ?
  `;

  db.query(conflictQuery, [
    datum,
    startZeit.toTimeString().slice(0, 5),
    endZeit.toTimeString().slice(0, 5),
  ], (err, results) => {
    if (err) return res.status(500).json({ error: "Fehler bei Prüfung." });

    if (results.length > 0) {
      return res.status(400).json({
        error: `In diesem Zeitfenster kann keine weitere Buchung erfolgen (min. ${abstandStunden} Std Abstand).`,
      });
    }

    // ✅ Benutzerinformationen holen
    const benutzerQuery = "SELECT vorname, nachname FROM benutzer WHERE id = ?";
    db.query(benutzerQuery, [benutzer_id], (err, userResult) => {
      if (err || userResult.length === 0) {
        return res.status(500).json({ error: "Benutzer nicht gefunden." });
      }

      const { vorname, nachname } = userResult[0];

      // ✅ Buchung speichern
      const insertSql = "INSERT INTO buchungen (datum, angebot, uhrzeit, benutzer_id) VALUES (?, ?, ?, ?)";
      db.query(insertSql, [datum, angebot, uhrzeit, benutzer_id], (err) => {
        if (err) return res.status(500).json({ error: "Fehler bei Eintragung." });

        // 📧 HTML-E-Mail senden
        const mailOptions = {
          from: '"SC Cars" <noreply@sccars.at>',
          to: "admin@example.com",
          subject: "✅ Neue Buchung",
          html: `
            <h3>Neue Buchung eingegangen:</h3>
            <p><strong>👤 Kunde:</strong> ${vorname} ${nachname}</p>
            <p><strong>📅 Datum:</strong> ${datum}</p>
            <p><strong>⏰ Uhrzeit:</strong> ${uhrzeit} Uhr</p>
            <p><strong>🛠️ Leistung:</strong> ${angebot}</p>
          `,
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) console.error("❌ Fehler beim Mailversand:", err);
          else console.log("📧 Bestätigungsmail versendet.");
        });

        res.status(200).json({ message: "Buchung erfolgreich." });
      });
    });
  });
});

//
// ✅ Eigene Buchungen anzeigen
//
app.get("/meine-buchungen/:benutzer_id", (req, res) => {
  const benutzer_id = req.params.benutzer_id;
  const sql = `
    SELECT id, datum, uhrzeit, angebot, erstellt_am
    FROM buchungen
    WHERE benutzer_id = ?
    ORDER BY datum ASC, uhrzeit ASC
  `;
  db.query(sql, [benutzer_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Fehler beim Abrufen." });
    res.status(200).json(results);
  });
});

//
// ✅ Buchung stornieren (nur >24h vorher)
//
app.delete("/buchung/:id", (req, res) => {
  const buchungId = req.params.id;
  const now = new Date();

  const sql = "SELECT datum, uhrzeit FROM buchungen WHERE id = ?";
  db.query(sql, [buchungId], (err, results) => {
    if (err || results.length === 0)
      return res.status(404).json({ error: "Buchung nicht gefunden." });

    const { datum, uhrzeit } = results[0];
    const buchungsDate = new Date(`${datum}T${uhrzeit}:00`);
    const diffHours = (buchungsDate - now) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return res.status(400).json({ error: "Stornierung nur bis 24h vorher möglich." });
    }

    const delSql = "DELETE FROM buchungen WHERE id = ?";
    db.query(delSql, [buchungId], (err) => {
      if (err) return res.status(500).json({ error: "Fehler beim Löschen." });
      res.status(200).json({ message: "Buchung erfolgreich storniert." });
    });
  });
});

//
// ✅ Gebuchte Zeiten an einem Datum abrufen
//
app.get("/vergebene-zeiten/:datum", (req, res) => {
  const { datum } = req.params;
  const sql = "SELECT uhrzeit, angebot FROM buchungen WHERE datum = ?";
  db.query(sql, [datum], (err, results) => {
    if (err) return res.status(500).json({ error: "Fehler beim Abrufen der Zeiten." });
    res.status(200).json(results);
  });
});

//
// ✅ Server starten
//
app.listen(PORT, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${PORT}`);
});
