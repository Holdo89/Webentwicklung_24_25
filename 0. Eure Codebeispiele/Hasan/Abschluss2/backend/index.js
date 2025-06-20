const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// ✅ Middleware: CORS für Frontend auf localhost:3000
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Middleware: JSON Body-Parsing
app.use(bodyParser.json());

// ✅ MySQL-Verbindung aufbauen
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sc-cars",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL-Verbindung fehlgeschlagen:", err.message);
  } else {
    console.log("✅ Mit MySQL verbunden (sc-cars).");
  }
});

// ✅ ROUTE: Kontaktformular speichern + E-Mail versenden
app.post("/kontakt", (req, res) => {
  const { name, email, nachricht } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
  }

  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err) => {
    if (err) {
      console.error("❌ Fehler beim Speichern des Kontakts:", err.message);
      return res.status(500).json({ error: "Fehler beim Speichern." });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "40e70e0246ed42",
        pass: "000f175fddfeaf",
      },
    });

    const mailOptions = {
      from: '"Website Kontaktformular" <no-reply@deinedomain.at>',
      to: "coders.bay.test2@hotmail.com",
      replyTo: email,
      subject: "Neue Kontaktanfrage über das Formular",
      text: `Von: ${name} <${email}>\n\n${nachricht}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ E-Mail-Versand fehlgeschlagen:", err.message);
        return res.status(500).json({ error: "E-Mail-Versand fehlgeschlagen." });
      }

      console.log("📨 E-Mail erfolgreich versendet:", info.response);
      res.status(200).json({ message: "Kontakt erfolgreich gesendet und gespeichert." });
    });
  });
});

// ✅ ROUTE: Buchung speichern
app.post("/buchung", (req, res) => {
  const { datum, angebot, uhrzeit } = req.body;

  if (!datum || !angebot || !uhrzeit) {
    return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein." });
  }

  const sql = "INSERT INTO buchungen (datum, angebot, uhrzeit) VALUES (?, ?, ?)";
  db.query(sql, [datum, angebot, uhrzeit], (err, result) => {
    if (err) {
      console.error("❌ Fehler beim Speichern der Buchung:", err.message);
      return res.status(500).json({ error: "Fehler beim Speichern der Buchung." });
    }

    console.log(`✅ Buchung gespeichert (ID: ${result.insertId})`);
    res.status(200).json({ message: "Buchung erfolgreich gespeichert." });
  });
});

// ✅ Fallback-Route für nicht gefundene Endpunkte (optional)
app.use((req, res) => {
  res.status(404).json({ error: "Endpunkt nicht gefunden." });
});

// ✅ Server starten
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${PORT}`);
});
