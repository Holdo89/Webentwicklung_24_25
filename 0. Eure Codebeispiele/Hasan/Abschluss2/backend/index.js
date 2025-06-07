const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL-Verbindung
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Standard XAMPP-Benutzer
  password: '',         // Standard XAMPP-Passwort (leer)
  database: 'sc-cars'  // Name deiner MySQL-Datenbank
});

db.connect(err => {
  if (err) {
    console.error('MySQL Verbindung fehlgeschlagen:', err);
    return;
  }
  console.log('MySQL verbunden!');
});

// Beispiel-Route: Daten vom Kontaktformular speichern
app.post('/kontakt', (req, res) => {
  const { name, email, nachricht } = req.body;
  const sql = 'INSERT INTO kontaktformular (name, email, nachricht) VALUES (?, ?, ?)';
  db.query(sql, [name, email, nachricht], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Fehler beim Speichern');
      return;
    }
    res.send('Daten gespeichert!');
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
