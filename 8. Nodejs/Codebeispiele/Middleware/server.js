import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
// app.use(morgan("tiny"))
app.use(logger)
app.use(checkPassword)

function logger(req, res, next){
  console.log(req.body)
  next();
}

function checkPassword(req, res, next){
  if(req.url==="/submit")
  {
  if(req.body.password === "Passwort"){
    console.log("Passwort gültig")
    next();
  }
  else{
    res.status(401).send("<h1>Das Passwort war nicht gültig</h1>")
  }
}
else{
  next();
}
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// app.post("/submit",(req, res) => {
//   res.send("<h1>"+req.body.username+"</h1>")
//   res.sendStatus(200)
// })

app.post("/submit",(req, res) => {
  res.status(201).render(__dirname + "/public/ejsexample.ejs", 
  {
    username: req.body.username
  });
})

// app.get("/endpoint", (req, res) => {
//   let yourUrl = "YOUR API URL";
//   try {
//     axios.get(yourUrl).then((response) => {
//       res.status(200).send("your Message"+response.data);
//     });
//   } catch (error) {
//     res.status(500).send("Fehler beim Aufruf der Api");
//   }
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
