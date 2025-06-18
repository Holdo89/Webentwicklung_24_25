const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// ✅ Erlaube Zugriff vom Frontend (Port 3000)
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST",
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// ✅ MySQL-Verbindung
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sc-cars",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL-Verbindung fehlgeschlagen:", err);
    return;
  }
  console.log("✅ MySQL verbunden!");
});

// ✅ POST /kontakt – Daten speichern + Mail versenden
app.post("/kontakt", (req, res) => {
  const { name, email, nachricht } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
  }

  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err, result) => {
    if (err) {
      console.error("❌ Fehler beim Speichern:", err);
      return res.status(500).json({ error: "Fehler beim Speichern." });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "40e70e0246ed42",  // <-- Deine Mailtrap-Zugangsdaten
        pass: "000f175fddfeaf",
      },
    });

    const mailOptions = {
      from: '"Website Kontaktformular" <no-reply@deinedomain.at>',
      to: "kochdominic@hotmail.com",
      replyTo: email,
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

app.listen(3001, () => {
  console.log("🚀 Backend läuft auf http://localhost:3001");
});
