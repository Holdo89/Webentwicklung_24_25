const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL-Verbindung
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sc-cars",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL-Verbindung fehlgeschlagen:", err);
    return;
  }
  console.log("✅ MySQL verbunden!");
});

// POST /kontakt – Formulardaten verarbeiten
app.post("/kontakt", (req, res) => {
  const { name, email, nachricht } = req.body;

  // 1. E-Mail validieren
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
  }

  // 2. In Datenbank speichern
  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err, result) => {
    if (err) {
      console.error("❌ Fehler beim Speichern:", err);
      return res.status(500).json({ error: "Fehler beim Speichern." });
    }

    // 3. E-Mail senden (Mailtrap oder anderer SMTP-Dienst)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // SMTP-Host z.B. von Mailtrap
      port: 2525, // Port für Mailtrap
      secure: false, // true für 465, false für andere Ports
      auth: {
        user: "40e70e0246ed42", // <- Mailtrap-User 
        pass: "000f175fddfeaf", // <- Mailtrap-Passwort 
      },
    });

    const mailOptions = {
      from: '"Website Kontaktformular" <no-reply@deinedomain.at>', // fester Absender
      to: "kochdominic@hotmail.com", // EMPFÄNGER
      replyTo: email, // Benutzer-Mail für Antwort
      subject: "Neue Kontaktanfrage über das Formular",
      text: `Von: ${name} <${email}>\n\n${nachricht}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Fehler beim E-Mail-Versand:", err);
        return res.status(500).json({ error: "E-Mail-Versand fehlgeschlagen." });
      }

      console.log("📨 E-Mail gesendet:", info.response);
      res.status(200).json({ message: "Erfolgreich gesendet und gespeichert." });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
