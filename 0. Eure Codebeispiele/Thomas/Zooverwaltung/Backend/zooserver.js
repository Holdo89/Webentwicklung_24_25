import express from "express";
import cors from "cors";
import mysql from "mysql";
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
    console.error("Fehler bei der Verbindung:", err);
  } else {
    console.log("Erfolgreich mit der Datenbank verbunden");
  }
});

app.get("/getAnimals", (req, res) => {
  const query = "SELECT * FROM tiere";
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("interner Serverfehler");
    } else {
      res.json(results);
    }
  });
});

app.post("/addNewAnimal", (req, res) => {
    const tiername=req.body.tiername
    const tierart=req.body.tierart
    const query = `INSERT INTO tiere (Tiername,Tierart) VALUES ("${tiername}","${tierart}")`
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).send("interner Serverfehler");
      } else {
        res.status(201).send("Tier wurde angelegt")
      }
    });
  });

app.delete("/deleteAnimal",(req,res)=>{
  const query=`DELETE FROM tiere WHERE ID=${req.body.id}`
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send("interner Serverfehler");
    } else {
      res.status(201).send("Tier wurde gelöscht")
    }
  });
})


app.listen(port, () => {
  console.log("Server startet ok");
});
