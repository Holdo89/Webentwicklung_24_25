import bodyParser from "body-parser";
import express, { response } from "express";
import axios from "axios";
import cors from "cors";
import mysql from "mysql"
const app = express();
const port = 3000;

app.get;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Databank Verbindung
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

// app.use(checkUser);
// function checkUser(req, res, next) {
//   const username = "Marko";
//   const password = "marko123";
//   if (username === req.body.Username && password === req.body.Password) {
//     next();
//   } else {
//     res.status(401).send("Dein Login ist fehlgeschlagen, probiere es noch einmal");
//   }
// }


app.listen(port, () => {
  console.log(`Server starting`);
});
