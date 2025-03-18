import express, { response } from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(checkPassword);

function checkPassword(req, res, next) {
  let password = req.body.password;
  let Username = req.body.username;
  if (password === "Codersbay" && Username === "thomas") {
    next();
  } else {
    res.status(400).send("PW or Username is incorrect");
  }
}

app.get("/", (req, res) => {
  res.send("<h1>Hello Thas</h1>");
});



app.get("/iss", (req, res) => {
  let yourUrl = " https://api.wheretheiss.at/v1/satellites/25544";
  try {
    axios.get(yourUrl).then((response) => {
      res.status(200).send(`<iframe
        width="50%%"
        height="600"
        frameborder="0"
        scrolling="no"
        id="gmap_canvas"
        src="https://maps.google.com/maps?height=400&hl=en&q=${response.data.latitude},${response.data.longitude}&t=&z=12&ie=UTF8&iwloc=B&output=embed"
      ></iframe>`);


    });
  } catch (error) {
    res.status(500).send("Fehler beim Aufruf");
  }
});



app.listen(port, () => {
    console.log("Server startet");
  });
