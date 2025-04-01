import express from "express";
import cors from "cors";
import mysql from "mysql"

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todos'
});
connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err);
    } else {
        console.log('Erfolgreich mit der Datenbank verbunden');
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server startet on port ${port}`);
});

app.get("/todos", (req, res) => {
    const query = 'SELECT * FROM todo';
    connection.query(query, (error, todo)  => {
        if (error) {
            res.status(500).send('Interner Serverfehler');
        } else {
            res.json(todo);
        }
        
    });
    connection.end();
});

let todos = [
  {
    id: 1,
    todo: "Hausaufgaben",
  },
  {
    id: 2,
    todo: "Training",
  },
];