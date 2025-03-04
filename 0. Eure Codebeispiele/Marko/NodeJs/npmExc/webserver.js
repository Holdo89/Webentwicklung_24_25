import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});
app.post("/register", (req, res) => {
  res.send("Post request successfull");
  res.sendStatus(201);
});
app.post("/submit", (req, res)=>{
    console.log("username:", req.body.username);
    let password = "myPassword"
    if (req.body.password===password){
        //res.send("User successfully created: "+req.body.username)<l
       //res.sendStatus(201);
       res.status(201).send("User successfully created: "+req.body.username)
    }
    else{
        //res.send("The password is wrong:  "+req.body.username)
        //res.sendStatus(201);
        res.status(400).send("The password is wrong:  ")
    }
})
app.put("/user/marko", (req, res) => {
  res.send("Put request successfull");
  res.sendStatus(200);
});
app.delete("/user/marko", (req, res) => {
  res.send("Delete request successfull");
  res.sendStatus(200);
});

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(port, () => {
  console.log("Server starting on port ${port}");
});

