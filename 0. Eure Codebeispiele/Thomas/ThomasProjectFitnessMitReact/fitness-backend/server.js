require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecrettoken123";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API läuft");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myfitnessapp",
});

db.connect((err) => {
  if (err) {
    console.log("Fehler bei der Verbindung", err);
  } else {
    console.log("Erfolgreich mit der Datenbank verbunden");
  }
});

//register backend
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Passwort hashen
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send("Fehler beim Hashen");
    }

    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hash], (err, results) => {
      if (err) {
        return res.status(500).send("Datenbankfehler");
      }
      res.status(201).send("User registriert");
    });
  });
});

// Endpunkt zur Prüfung, ob ein Benutzername bereits vergeben ist
app.get("/check-username", (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ exists: false, message: "Kein Benutzername angegeben" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Fehler bei der DB-Abfrage:", err);
      return res.status(500).json({ exists: false, message: "Datenbankfehler" });
    }

    if (results.length > 0) {
      return res.json({ exists: true }); // Benutzername gibts schon
    } else {
      return res.json({ exists: false }); // Benutzername ist frei
    }
  });
});


//Login backend
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).send("Datenbankfehler");
    if (results.length === 0)
      return res.status(401).send("E-Mail nicht gefunden");

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).send("Fehler beim Vergleichen");
      if (!match) return res.status(401).send("Falsches Passwort");

      // Token erstellen mit payload (z.B. id und username)
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: "6h" }
      );

      
      res.status(200).json({
        message: "Login erfolgreich",
        token,
        username: user.username,
        level: user.level,
      });
    });
  });
});

// Middleware zum Authentifizieren
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token fehlt' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token ungültig' });
    req.user = user; 
    next();
  });
}

// Level setzen Endpoint
app.put('/user/level', authenticateToken, (req, res) => {
  const { level } = req.body;
  if (!level) {
    return res.status(400).json({ message: 'Level ist erforderlich' });
  }

  const sql = 'UPDATE users SET level = ? WHERE id = ?';
  db.query(sql, [level, req.user.id], (err, results) => {
    if (err) {
      console.error('Fehler beim Setzen des Levels:', err);
      return res.status(500).json({ message: 'Serverfehler' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User nicht gefunden' });
    }

    res.status(200).json({ message: 'Level erfolgreich gesetzt', level });
  });
});


app.get("/trainingsplan", (req, res) => {
  const { level, muscle_group_id } = req.query;

  if (!level) {
    return res.status(400).json({ message: "Level ist erforderlich" });
  }

  let sql = "SELECT * FROM exercises WHERE level = ?";
  const params = [level];

  if (muscle_group_id) {
    sql += " AND muscle_group_id = ?";
    params.push(muscle_group_id);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "Datenbankfehler" });
    res.json(results);
  });
});
//videos aus der db holen
app.get("/videos",(req,res)=>{
db.query("SELECT id, name, video_url FROM exercises WHERE video_url IS NOT NULL", (err, results) => {
  if (err) return res.status(500).send(err);
  res.json(results);
});
});




const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server läuft auf Port ${port}`));
