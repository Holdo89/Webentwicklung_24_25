import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todos",
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

app.get("/todos", (req, res) => {
  const query = "SELECT * FROM todos";
  connection.query(query, (error, todos) => {
    if (error) {
      res.status(500).send("interner Serverfehler");
    } else {
      res.json(todos);
    }
  });
  connection.end();
});

let todos = [
  {
    id: 1,
    todo: "lernen",
  },
  {
    id: 2,
    todo: "programmieren",
  },
  {
    id: 3,
    todo: "putzen",
  },
  {
    id: 4,
    todo: "kochen",
  },
];
