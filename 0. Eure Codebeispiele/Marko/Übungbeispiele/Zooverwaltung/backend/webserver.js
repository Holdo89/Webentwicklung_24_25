import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "zooverwaltung",
});

connection.connect((err) => {
  if (err) {
    console.log("Fehler bei der Verbindung zur Datenbank:", err);
  } else {
    console.log("Erfolgreich mit der Datenbank verbunden");
  }
});

app.get("/tiere", (req, res) => {
  const query = "SELECT * FROM tiere";
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("Interner Fehler");
    } else {
      res.json(results);
    }
  });
});

app.post("/posttiere", (req, res) => {
  const tiername = req.body.tiername;
  const tierart = req.body.tierart;
  const query = `INSERT INTO tiere(tiername, tierart) VALUES ('${tiername}','${tierart}')`;
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send("Hat nicht geklappt");
    } else {
      res.status(200).send("Tier wurde angelegt");
    }
  });
});

app.delete("/deleteAnimal", (req, res) => {
  const query = `DELETE FROM tiere WHERE id=${req.body.id}`;
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send("Hat nicht geklappt");
    } else {
      res.status(200).send("Tier wurde gelöscht");
    }
  });
});

app.listen(port, () => {
  console.log(`Server starting`);
});
