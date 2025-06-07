import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
import cors from "cors";
import mysql from "mysql";

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datenbank-Verbindung
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookbay",
});

connection.connect((err) => {
  if (err) {
    console.log("Fehler bei der Verbindung zur Datenbank:", err);
  } else {
    console.log("Erfolgreich mit der Datenbank verbunden");
  }
});

// Endpunkte

// Login (Anmeldung)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Bitte gib dein E-Mail und Passwort ein.");
  }

  const query = 'SELECT * FROM user WHERE email = ?';
  connection.query(query, [email], (err, results) => { 
    if (err) {
      console.error(err);
      return res.status(500).send("Server fehler!");
    }

    if (results.length === 0) {
      return res.status(401).send("User nicht gefunden.");
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).send("Falsches Passwort");
    }

    res.status(200).send({ message: "Login erfolgreicher Login", user: user });
  });
});

//Registrierung 
app.post('/register', (req, res) => {
  const { name, last_name, email, password } = req.body;

  if (!name || !last_name || !email || !password ) {
    return res.status(400).send("Alle Felder müssen ausgefüllt werden.");
  }

  const checkQuery = "SELECT * FROM user WHERE email = ?";
  connection.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Serverfehler beim Überprüfen des E-Mails.");
    }

    if (results.length > 0) {
      return res.status(409).send("E-Mail ist bereits registriert.");
    }

    const insertQuery = "INSERT INTO user (name, last_name, email, password) VALUES (?, ?, ?, ?)";
    connection.query(insertQuery, [name, last_name, email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Fehler beim Einfügen in die Datenbank.");
      }

      res.status(201).send({ message: "Benutzer erfolgreich registriert!" });
    });
  });
});

// Bekomme alle Termine
app.get("/bookings", (req, res) => {
  const query = "SELECT * FROM bookings";
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("Interner Fehler");
    } else {
      res.json(results);
    }
  });
});

// Neuen Termin in 'bookings' speichern
app.post('/bookings', (req, res) => {
  const { date, title } = req.body;

  if (!date || !title) {
    return res.status(400).send("Titel und Datum müssen angegeben werden.");
  }

  const [day, time] = date.split(' '); 

  const query = "INSERT INTO bookings (date, time, title) VALUES (?, ?, ?)";
  connection.query(query, [day, time, title], (err, result) => {
    if (err) {
      console.error("Fehler beim Einfügen in bookings:", err);
      return res.status(500).send("Speichern des Termins fehlgeschlagen.");
    }

    res.status(201).send({ message: "Termin erfolgreich gespeichert!", id: result.insertId });
  });
});

// Passwort ändern
app.post('/change-password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).send("Fehlende Daten.");
  }

  const query = "SELECT * FROM user WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) return res.status(500).send("Serverfehler beim Abrufen des Users.");

    if (results.length === 0) {
      return res.status(404).send("Benutzer nicht gefunden.");
    }

    const user = results[0];

    if (user.password !== oldPassword) {
      return res.status(401).send("Altes Passwort ist falsch.");
    }

    const updateQuery = "UPDATE user SET password = ? WHERE email = ?";
    connection.query(updateQuery, [newPassword, email], (err) => {
      if (err) return res.status(500).send("Fehler beim Aktualisieren des Passworts.");
      return res.status(200).send("Passwort wurde erfolgreich geändert.");
    });
  });
});





// Server starten
app.listen(port, () => {
  console.log(`Server starting`);
});
