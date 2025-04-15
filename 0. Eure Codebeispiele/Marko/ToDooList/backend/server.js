import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";
const app = express();
const port = 8090;

//Databank
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todos",
});

connection.connect((err) => {
  if (err) {
    console.log("Fehler bei der Verbindung zur Datenbank:", err);
  } else {
    console.log("Erfolgreich mit der Datenbank verbunden");
  }
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todo", (req, res) => {
    const query ='SELECT * FROM todos';
    connection.query(query, (error, results)=>{
        if(error){
            res.send(500).send('Interner Fehler')
        } else {
            res.json(results);
        }
    })
    // connections.end();
});


// app.post("/posttodo", (req, res) => {
//   const query = `INSERT INTO todos(title) VALUES ('${req.body.task}')`;
//   connection.query(query, (error, results)=> {
//     if(error){
//       res.send(500).send("Hat nicht geklappt")
//     } else{
//       res.send(200).send("Hat nicht geplappt")
//     }
//   })
// })
app.post("/posttodo", (req, res) => {
  console.log("Request Body:", req.body);
  const query = `INSERT INTO todos(title) VALUES ('${req.body.key}')`;
  connection.query(query, [req.body.key], (error, results) => {
    if (error) {
      return res.status(500).send("Hat nicht geklappt");
    } else{
      res.status(200).send("Hat geklappt");
    }
  });
});

app.listen(port, () => {
    console.log(`Server starting`);
  });

let todo = [
  {
    id: 1,
    todo: "Schlafen",
  },
  {
    id: 2,
    todo: "Kochen",
  },
  {
    id: 3,
    todo: "Lesen",
  },
];





