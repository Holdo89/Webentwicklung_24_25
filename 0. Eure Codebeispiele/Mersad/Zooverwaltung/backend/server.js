import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Zooverwaltung",
});

connection.connect((err) => {
  if (err) {
    console.error("Fehler bei der Verbindung zur Datenbank: ", err);
  } else {
    console.log("Erfolgreich mit der Datenbank verbunden");
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server startet on port ${port}`);
});

app.get("/tiere", (req, res) => {
  const query = "SELECT * FROM Tiere";
  connection.query(query, (error, Tiere) => {
    if (error) {
      res.status(500).send("interner Serverfehler");
    } else {
      res.json(Tiere);
    }
  });
});

app.post("/addNewAnimal", (req, res) => {
  const tiername = req.body.tiername;
  const tierart = req.body.tierart;
  const query = `INSERT INTO Tiere (tiername, tierart) VALUES ("${tiername}", "${tierart}")`;
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("interner Serverfehler");
    } else {
      res.status(201).send("Tier wurde angelegt");
    }
  });
});

app.delete("/deleteAnimal", (req, res) => {
  const query = `DELETE FROM tiere WHERE id=${req.body.id}`;
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("interner Serverfehler");
    } else {
      res.status(201).send("Tier wurde gelöscht");
    }
  });
});
