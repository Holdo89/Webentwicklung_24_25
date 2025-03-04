import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
const correctPassword = "password123"

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html")); 
});



app.post("/register", (req, res) => {
   
    res.send("User registered");
  });
  
  app.post("/login", (req, res) => {
    const { password } = req.body;
    if (password === correctPassword) {
      res.send("Login successful");
    } else {
      res.send("Invalid password");
    }
  });





  
app.patch("/users",(req, res)=>{
    (res.send("<h1>Im User</h1>"))
    ( res.sendStatus(201))
 });

 app.delete("/delete",(req, res)=>{
    ( res.sendStatus(404))
 });


app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000/");
});
