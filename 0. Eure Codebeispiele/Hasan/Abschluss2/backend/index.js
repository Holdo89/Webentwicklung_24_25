const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET = "dein_geheimer_schluessel"; // besser in .env auslagern

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(bodyParser.json());

// ✅ MySQL-Verbindung
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sc-cars",
});

db.connect((err) => {
  if (err) console.error("❌ MySQL-Fehler:", err);
  else console.log("✅ MySQL verbunden");
});

// ✅ Benutzerregistrierung
app.post("/register", async (req, res) => {
  const { name, email, passwort } = req.body;
  if (!email || !passwort) return res.status(400).json({ error: "E-Mail und Passwort erforderlich." });

  try {
    const hashed = await bcrypt.hash(passwort, 10);
    const sql = "INSERT INTO benutzer (name, email, passwort) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashed], (err) => {
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

// ✅ Benutzer-Login
app.post("/login", (req, res) => {
  const { email, passwort } = req.body;
  if (!email || !passwort) return res.status(400).json({ error: "Login-Daten fehlen." });

  const sql = "SELECT * FROM benutzer WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      console.error("❌ Benutzer nicht gefunden oder Fehler:", err);
      return res.status(400).json({ error: "Benutzer nicht gefunden." });
    }

    const user = results[0];
    const match = await bcrypt.compare(passwort, user.passwort);
    if (!match) {
      console.warn("❌ Falsches Passwort für:", email);
      return res.status(401).json({ error: "Falsches Passwort." });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: "2h" });
    console.log("🔐 Benutzer eingeloggt:", email);
    res.status(200).json({ message: "Login erfolgreich", token });
  });
});

// ✅ Kontaktformular
app.post("/kontakt", (req, res) => {
  console.log("📩 Neue Kontaktanfrage erhalten:", req.body);

  const { name, email, nachricht } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    console.warn("⚠️ Ungültige E-Mail:", email);
    return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
  }

  const sql = "INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)";
  db.query(sql, [name, email, nachricht], (err) => {
    if (err) {
      console.error("❌ Fehler beim Speichern der Nachricht:", err);
      return res.status(500).json({ error: "Fehler beim Speichern." });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: { user: "40e70e0246ed42", pass: "000f175fddfeaf" },
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

// ✅ Buchung speichern mit Benutzer-ID
app.post("/buchung", (req, res) => {
  console.log("📆 Neue Buchung erhalten:", req.body);

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
