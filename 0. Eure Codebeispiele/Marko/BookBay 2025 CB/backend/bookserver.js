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
app.post('/register', (req, res)=> {
  const {name, last_name, email, password} =req.body;
})

// Bekomme alle Termine
app.get("/bookbay", (req, res) => {
  const query = "SELECT * FROM bookbay";
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("Interner Fehler");
    } else {
      res.json(results);
    }
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server starting`);
});
