const express = require("express");
const cors = require("cors");
const connection = require("./datenbank");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Rdy 2 go");
});



app.post("/register", (req, res) => {
  const { username, email, password,geschlecht } = req.body;

  const query = `
    INSERT INTO users (username, email, password,geschlecht)
    VALUES (?, ?, ?,?)
  `;

  
  connection.query(query, [username, email, password,geschlecht], (err, results) => {
    if (err) {
      console.error("Fehler bei der Registrierung:", err);
      return res.status(500).json({ error: "Fehler bei der Registrierung" });
    }

    
    res.status(201).json({
      message: "User erfolgreich registriert", 
    });
  });
});










app.listen(5000, () => {
  console.log("Server läuft auf Port 5000");
});
