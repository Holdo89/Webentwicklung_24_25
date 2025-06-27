// 📦 Abhängigkeiten importieren
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

// 📧 Mailtrap-Zugang (nur für Tests)
const MAIL_USER = "40e70e0246ed42";
const MAIL_PASS = "000f175fddfeaf";

// 🌐 Middleware aktivieren
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(bodyParser.json());

// 🔌 Verbindung zur MySQL-Datenbank
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sc-cars",
});
db.connect(err => {
  if (err) console.error("❌ Fehler bei DB-Verbindung:", err);
  else console.log("✅ Mit MySQL verbunden");
});

// 📤 Mail-Transporter einrichten (Mailtrap)
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

//
// ✅ REGISTRIERUNG
//
app.post("/register", async (req, res) => {
  const { vorname, nachname, email, passwort } = req.body;
  if (!vorname || !nachname || !email || !passwort)
    return res.status(400).json({ error: "Alle Felder erforderlich." });

  try {
    const hashed = await bcrypt.hash(passwort, 10);
    const sql = "INSERT INTO benutzer (vorname, nachname, email, passwort) VALUES (?, ?, ?, ?)";
    db.query(sql, [vorname, nachname, email, hashed], (err) => {
      if (err) return res.status(500).json({ error: "Registrierung fehlgeschlagen." });
      res.status(200).json({ message: "Registrierung erfolgreich." });
    });
  } catch {
    res.status(500).json({ error: "Serverfehler." });
  }
});

//
// ✅ LOGIN
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
// ✅ KONTAKTFORMULAR (inkl. Mail an Admin)
//
app.post("/kontakt", (req, res) => {
  const { name, email, nachricht } = req.body;

  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err) => {
    if (err) return res.status(500).json({ error: "Speicherung fehlgeschlagen." });

    const mailOptions = {
      from: '"SC Cars Kontakt" <kontakt@sccars.at>',
      to: "coders.bay.test2@hotmail.com",
      subject: "Neue Kontaktanfrage",
      text: `Von: ${name} <${email}>\n\n${nachricht}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).json({ error: "E-Mail-Versand fehlgeschlagen." });
      res.status(200).json({ message: "Nachricht gesendet." });
    });
  });
});

//
// ✅ BUCHUNG mit Validierung, Konfliktprüfung & Mail
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

  const checkSQL = `
    SELECT * FROM buchungen
    WHERE datum = ? AND TIME(uhrzeit) BETWEEN ? AND ?
  `;

  db.query(checkSQL, [
    datum,
    startZeit.toTimeString().slice(0, 5),
    endZeit.toTimeString().slice(0, 5),
  ], (err, results) => {
    if (err) return res.status(500).json({ error: "Fehler bei Prüfung." });

    if (results.length > 0) {
      return res.status(400).json({
        error: `In diesem Zeitfenster ist keine weitere Buchung möglich.`,
      });
    }

    // 👤 Benutzerinformationen holen (für Mail)
    const userQuery = "SELECT vorname, nachname, email FROM benutzer WHERE id = ?";
    db.query(userQuery, [benutzer_id], (err, benutzerRes) => {
      if (err || benutzerRes.length === 0)
        return res.status(500).json({ error: "Benutzer nicht gefunden." });

      const { vorname, nachname, email } = benutzerRes[0];

      const insertSql = `
        INSERT INTO buchungen (datum, angebot, uhrzeit, benutzer_id)
        VALUES (?, ?, ?, ?)
      `;
      db.query(insertSql, [datum, angebot, uhrzeit, benutzer_id], (err) => {
        if (err) return res.status(500).json({ error: "Fehler bei Eintragung." });

        // 📤 Admin-Mail
        transporter.sendMail({
          from: '"SC Cars" <noreply@sccars.at>',
          to: "admin@example.com",
          subject: "Neue Buchung eingegangen",
          html: `
            <h2>Neue Buchung</h2>
            <p><strong>Kunde:</strong> ${vorname} ${nachname}</p>
            <p><strong>📅 Datum:</strong> ${datum}</p>
            <p><strong>⏰ Uhrzeit:</strong> ${uhrzeit} Uhr</p>
            <p><strong>🛠️ Angebot:</strong> ${angebot}</p>
          `,
        });

        // 📤 Kunden-Bestätigung
        transporter.sendMail({
          from: '"SC Cars" <noreply@sccars.at>',
          to: email,
          subject: "📅 Buchungsbestätigung",
          html: `
            <h2>Vielen Dank für Ihre Buchung, ${vorname}!</h2>
            <p>Ihre Buchung wurde erfolgreich gespeichert:</p>
            <ul>
              <li><strong>📅 Datum:</strong> ${datum}</li>
              <li><strong>⏰ Uhrzeit:</strong> ${uhrzeit} Uhr</li>
              <li><strong>🛠️ Angebot:</strong> ${angebot}</li>
            </ul>
            <p>Wir freuen uns auf Ihren Besuch!</p>
          `,
        });

        res.status(200).json({ message: "Buchung erfolgreich." });
      });
    });
  });
});

//
// ✅ BUCHUNGEN FÜR EINEN BENUTZER
//
app.get("/meine-buchungen/:benutzer_id", (req, res) => {
  const sql = `
    SELECT id, datum, uhrzeit, angebot, erstellt_am
    FROM buchungen
    WHERE benutzer_id = ?
    ORDER BY datum ASC, uhrzeit ASC
  `;
  db.query(sql, [req.params.benutzer_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Abruf fehlgeschlagen." });
    res.status(200).json(results);
  });
});

//
// ✅ BUCHUNG STORNIEREN (nur > 24h vorher erlaubt)
//
app.delete("/buchung/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT datum, uhrzeit FROM buchungen WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err || results.length === 0)
      return res.status(404).json({ error: "Buchung nicht gefunden." });

    const buchungsZeit = new Date(`${results[0].datum}T${results[0].uhrzeit}:00`);
    const now = new Date();
    const diffH = (buchungsZeit - now) / (1000 * 60 * 60);

    if (diffH < 24) {
      return res.status(400).json({ error: "Nur bis 24h vorher stornierbar." });
    }

    db.query("DELETE FROM buchungen WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Löschen fehlgeschlagen." });
      res.status(200).json({ message: "Buchung storniert." });
    });
  });
});

//
// ✅ ALLE VERGEBENEN ZEITEN FÜR EIN DATUM (Frontend-Nutzung)
//
app.get("/vergebene-zeiten/:datum", (req, res) => {
  const { datum } = req.params;
  db.query("SELECT uhrzeit, angebot FROM buchungen WHERE datum = ?", [datum], (err, results) => {
    if (err) return res.status(500).json({ error: "Abruf fehlgeschlagen." });
    res.status(200).json(results);
  });
});

//
// ✅ SERVER STARTEN
//
app.listen(PORT, () => {
  console.log(`🚀 Server läuft unter http://localhost:${PORT}`);
});
