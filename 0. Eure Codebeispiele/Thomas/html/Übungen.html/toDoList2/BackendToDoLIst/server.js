import express from "express";
const app = express();
import cors from "cors";
const port = 3000;
import mysql from "mysql";


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connection =mysql.createConnection({
    host:'localhost',
    user: "root",
    password:"",
    database:"todolist"
});

connection.connect((err)=>{
    if(err){
        console.error("Fehler bei der Verbindung:",err);
    }else{
        console.log("Erfolgreich mit der Datenbank verbunden");
    }
});





app.get("/toDo",(req,res)=>{
    const query="SELECT * FROM todolist";
    connection.query(query,(error,results)=>{
        if(error){
            res.status(500).send("interner Serverfehler");
        }else{
            res.json(results);
        }
    });  
    
});

app.post("/newToDo",(req,res)=>{
    const query= `INSERT INTO todolist (title) VALUES ('${req.body.task}')`
    connection.query(query,(error,results)=>{
        if(error){
            res.status(500).send("hat nicht geklappt")
        }
        else{
            res.status(200).send("hat geklappt")
        }
    })
})

app.delete("/delete",(req,res)=>{
    const query=`DELETE FROM Todolist WHERE`
    
})












app.listen(port, () => {
    console.log("Server startet ok");
  });
