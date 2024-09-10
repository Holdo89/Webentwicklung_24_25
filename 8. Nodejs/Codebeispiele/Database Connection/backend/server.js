import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'feedcube_react'
});

connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
  } else {
    console.log('Erfolgreich mit der Datenbank verbunden');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../frontend'));

//Get a random joke
app.get("/users", (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Interner Serverfehler');
    } else {
      res.json(results);
    }
  });
});

app.get("/usertable", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../frontend/usertable.html"));
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});