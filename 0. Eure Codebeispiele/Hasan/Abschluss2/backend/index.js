// 📦 Importiere erforderliche Pakete
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔐 Konstante für Token-Erzeugung – in .env-Datei auslagern empfohlen!
const SECRET = "dein_geheimer_schluessel";

const app = express();

// 🌍 CORS erlauben – Frontend darf Requests schicken
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// 🧠 Body Parser Middleware für JSON-Anfragen
app.use(bodyParser.json());

// 🗄️ MySQL-Verbindung herstellen
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sc-cars",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL-Fehler:", err);
  } else {
    console.log("✅ MySQL verbunden");
  }
});


// ✅ 1. Registrierung eines neuen Benutzers
app.post("/register", async (req, res) => {
  const { vorname, nachname, email, passwort } = req.body;

  // 🔍 Prüfung: Alle Felder vorhanden?
  if (!vorname || !nachname || !email || !passwort) {
    return res.status(400).json({ error: "Alle Felder sind erforderlich." });
  }

  try {
    // 🔐 Passwort verschlüsseln
    const hashed = await bcrypt.hash(passwort, 10);

    // 💾 In die Datenbank einfügen
    const sql = "INSERT INTO benutzer (vorname, nachname, email, passwort) VALUES (?, ?, ?, ?)";
    db.query(sql, [vorname, nachname, email, hashed], (err) => {
      if (err) {
        console.error("❌ Registrierung fehlgeschlagen:", err);
        return res.status(500).json({ error: "Fehler bei der Registrierung." });
      }

      console.log("✅ Neuer Benutzer registriert:", email);
      res.status(200).json({ message: "Benutzer erfolgreich registriert." });
    });
  } catch (err) {
    console.error("❌ Fehler beim Hashing:", err);
    res.status(500).json({ error: "Serverfehler." });
  }
});


// ✅ 2. Login eines bestehenden Benutzers
app.post("/login", (req, res) => {
  const { email, passwort } = req.body;

  if (!email || !passwort) {
    return res.status(400).json({ error: "Login-Daten fehlen." });
  }

  const sql = "SELECT * FROM benutzer WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      console.error("❌ Benutzer nicht gefunden:", err);
      return res.status(400).json({ error: "Benutzer nicht gefunden." });
    }

    const user = results[0];

    // 🔐 Passwort vergleichen
    const match = await bcrypt.compare(passwort, user.passwort);
    if (!match) {
      return res.status(401).json({ error: "Falsches Passwort." });
    }

    // 🔐 JWT-Token erstellen
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


// ✅ 3. Kontaktformular speichern und Mail senden
app.post("/kontakt", (req, res) => {
  const { name, email, nachricht } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
  }

  // 💾 Nachricht speichern
  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err) => {
    if (err) {
      console.error("❌ Fehler beim Speichern der Nachricht:", err);
      return res.status(500).json({ error: "Fehler beim Speichern." });
    }

    // ✉️ E-Mail senden (Mailtrap Beispiel)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "40e70e0246ed42",
        pass: "000f175fddfeaf",
      },
    });

    const mailOptions = {
      from: '"Website Kontakt" <no-reply@deinedomain.at>',
      to: "coders.bay.test2@hotmail.com",
      replyTo: email,
      subject: "Neue Kontaktanfrage",
      text: `Von: ${name} <${email}>\n\n${nachricht}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Fehler beim E-Mail-Versand:", err);
        return res.status(500).json({ error: "E-Mail-Versand fehlgeschlagen." });
      }

      console.log("📨 E-Mail gesendet:", info.response);
      res.status(200).json({ message: "Gesendet & gespeichert." });
    });
  });
});


// ✅ 4. Buchung speichern (nur mit Benutzer-ID)
app.post("/buchung", (req, res) => {
  const { datum, angebot, uhrzeit, benutzer_id } = req.body;

  if (!datum || !angebot || !uhrzeit || !benutzer_id) {
    return res.status(400).json({ error: "Alle Felder inkl. Benutzer-ID erforderlich." });
  }

  const sql = "INSERT INTO buchungen (datum, angebot, uhrzeit, benutzer_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [datum, angebot, uhrzeit, benutzer_id], (err, result) => {
    if (err) {
      console.error("❌ Fehler beim Speichern der Buchung:", err);
      return res.status(500).json({ error: "Fehler beim Speichern." });
    }

    console.log("✅ Buchung gespeichert mit ID:", result.insertId);
    res.status(200).json({ message: "Buchung erfolgreich gespeichert." });
  });
});


// ✅ Server starten
app.listen(3001, () => {
  console.log("🚀 Server läuft auf http://localhost:3001");
});
