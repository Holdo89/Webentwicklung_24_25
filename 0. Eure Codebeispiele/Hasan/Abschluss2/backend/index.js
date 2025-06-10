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
  console.log("MySQL verbunden!");
});

// 🚀 Kontakt-Route
app.post("/kontakt", (req, res) => {
  const { name, email, nachricht } = req.body;

  // 1. Validierung
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
  }

  // 2. In MySQL speichern
  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err, result) => {
    if (err) {
      console.error("Fehler beim Speichern:", err);
      return res.status(500).json({ error: "Fehler beim Speichern." });
    }

    // 3. E-Mail mit Mailtrap senden
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      secure: false, // wichtig!
      auth: {
        user: "40e70e0246ed42", // <== Mailtrap Dashboard
        pass: "000f175fddfeaf", // <== Mailtrap Dashboard
      },
    });

    const mailOptions = {
      from: '"Website Kontaktformular" <no-reply@deine-domain.at>',
      to: "dein.name@mailtrap.io", // meine Mailtrap-Inbox-Adresse
      subject: "Neue Kontaktanfrage",
      text: `Von: ${name} <${email}>\n\n${nachricht}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Fehler beim E-Mail-Versand:", err);
        return res.status(500).json({ error: "E-Mail-Versand fehlgeschlagen." });
      }

      console.log("E-Mail gesendet:", info.response);
      res.status(200).json({ message: "Erfolgreich gespeichert & E-Mail gesendet." });
    });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
