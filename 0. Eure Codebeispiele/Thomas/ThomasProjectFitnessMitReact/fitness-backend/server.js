require('dotenv').config();
const express=require("express");
const cors=require("cors");
const app=express();
const mysql=require("mysql2");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "supersecrettoken123";

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("API läuft");
});



const db = mysql.createConnection({
  host: 'localhost',    
  user: 'root',    
  password: '', 
  database: 'myfitnessapp'  
});

db.connect((err)=>{
    if(err){
        console.log("Fehler bei der Verbindung",err);
    }else{
        console.log("Erfolgreich mit der Datenbank verbunden");
    }
});

//register backend
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Passwort hashen
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send('Fehler beim Hashen');
    }

    
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hash], (err, results) => {
      if (err) {
        return res.status(500).send('Datenbankfehler');
      }
      res.status(201).send('User registriert');
    });
  });
});

//Login backend
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).send("Datenbankfehler");
    if (results.length === 0) return res.status(401).send("E-Mail nicht gefunden");

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).send("Fehler beim Vergleichen");
      if (!match) return res.status(401).send("Falsches Passwort");

      // Token erstellen mit payload (z.B. id und username)
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
        
      // Token und evtl. Userdaten zurückschicken
      res.status(200).json({ message: "Login erfolgreich", token, username: user.username });
    });
  });
});

const port =process.env.PORT || 3001;
app.listen(port,()=>console.log(`Server läuft auf Port ${port}`));

