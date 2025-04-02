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

app.post("/newTodo", (req, res) => {
  const query = `INSERT INTO todos (todo) VALUES ('${req.body.task}')`;
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("interner Serverfehler");
    } else {
      res.status(200).send("Eintrag erfolgreich");
    }
  });
});

app.delete("/delete", (req, res) => {
  const query = `DELETE FROM todos WHERE id = ?`;

  connection.query(query, [req.body.id], (error, results) => {
    if (error) {
      console.error("Fehler beim Löschen:", error);
      res.status(500).json({ error: "Interner Serverfehler" });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Erfolgreich gelöscht" });
      } else {
        res.status(404).json({ error: "Aufgabe nicht gefunden" });
      }
    }
  });
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
});
