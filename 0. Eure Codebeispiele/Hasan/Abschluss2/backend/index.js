// 📦 Erforderliche Pakete
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3001;

// 🛡️ Sicherheitsschlüssel für JWT (normalerweise aus .env laden)
const SECRET = "dein_geheimer_schluessel";

// 📧 Mailtrap Zugangsdaten
const MAIL_USER = "40e70e0246ed42";
const MAIL_PASS = "000f175fddfeaf";

// 🌐 CORS erlauben (Frontend darf Anfragen senden)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// 🧠 Body Parser (damit JSON-Daten gelesen werden können)
app.use(bodyParser.json());

// 🔌 Verbindung zur Datenbank
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sc-cars",
});

db.connect((err) => {
  if (err) console.error("❌ DB Fehler:", err);
  else console.log("✅ Verbunden mit MySQL");
});

// ✅ Registrierung
app.post("/register", async (req, res) => {
  const { vorname, nachname, email, passwort } = req.body;
  if (!vorname || !nachname || !email || !passwort) {
    return res.status(400).json({ error: "Alle Felder erforderlich." });
  }
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

// ✅ Login
app.post("/login", (req, res) => {
  const { email, passwort } = req.body;
  const sql = "SELECT * FROM benutzer WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: "Benutzer nicht gefunden." });
    const user = results[0];
    const match = await bcrypt.compare(passwort, user.passwort);
    if (!match) return res.status(401).json({ error: "Falsches Passwort." });

    const token = jwt.sign({ id: user.id, vorname: user.vorname }, SECRET, { expiresIn: "2h" });
    res.status(200).json({
      message: "Login erfolgreich",
      token,
      id: user.id,
      vorname: user.vorname,
      nachname: user.nachname
    });
  });
});

// ✅ Kontaktformular + Mailversand
app.post("/kontakt", (req, res) => {
  const { name, email, nachricht } = req.body;
  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err) => {
    if (err) return res.status(500).json({ error: "Speicherfehler." });

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    const mailOptions = {
      from: '"SC Cars Kontakt" <kontakt@sccars.at>',
      to: "coders.bay.test2@hotmail.com",
      subject: "Neue Kontaktanfrage",
      text: `Von: ${name} <${email}>\n\n${nachricht}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).json({ error: "E-Mail-Versand fehlgeschlagen." });
      res.status(200).json({ message: "Gespeichert & gesendet." });
    });
  });
});

// ✅ Buchung speichern
app.post("/buchung", (req, res) => {
  const { datum, angebot, uhrzeit, benutzer_id } = req.body;
  if (!datum || !angebot || !uhrzeit || !benutzer_id) {
    return res.status(400).json({ error: "Alle Felder erforderlich." });
  }

  const sql = "INSERT INTO buchungen (datum, angebot, uhrzeit, benutzer_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [datum, angebot, uhrzeit, benutzer_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Fehler bei Buchung." });

    res.status(200).json({ message: "Buchung erfolgreich." });
  });
});

// ✅ Eigene Buchungen abrufen
app.get("/meine-buchungen/:benutzer_id", (req, res) => {
  const benutzer_id = req.params.benutzer_id;
  const sql = `
    SELECT id, datum, uhrzeit, angebot, erstellt_am
    FROM buchungen
    WHERE benutzer_id = ?
    ORDER BY datum ASC, uhrzeit ASC
  `;
  db.query(sql, [benutzer_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Fehler beim Abrufen der Buchungen." });
    res.status(200).json(results);
  });
});

// ✅ Buchung stornieren – nur wenn mehr als 24h vorher
app.delete("/buchung/:id", (req, res) => {
  const buchungId = req.params.id;
  const now = new Date(); // ⏱️ aktueller Zeitpunkt

  // 🔎 Hole Buchungsdatum + Uhrzeit
  const sql = "SELECT datum, uhrzeit FROM buchungen WHERE id = ?";
  db.query(sql, [buchungId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: "Buchung nicht gefunden." });
    }

    const { datum, uhrzeit } = results[0];

    // 🗓️ Kombiniere Datum + Uhrzeit zu einem gültigen Date-Objekt
    const buchungDateTime = new Date(`${datum}T${uhrzeit}:00`);

    const diffMs = buchungDateTime.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60); // Unterschied in Stunden

    if (diffHours < 24) {
      return res.status(400).json({ error: "Stornierung nur bis 24h vorher möglich." });
    }

    // 🗑️ Buchung löschen
    const delSql = "DELETE FROM buchungen WHERE id = ?";
    db.query(delSql, [buchungId], (err) => {
      if (err) return res.status(500).json({ error: "Fehler beim Löschen." });
      res.status(200).json({ message: "Buchung erfolgreich storniert." });
    });
  });
});

// ✅ Server starten
app.listen(PORT, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${PORT}`);
});
