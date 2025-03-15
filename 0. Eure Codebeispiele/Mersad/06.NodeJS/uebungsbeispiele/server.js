import express, { response } from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(passwordchecker);

app.get("/", (req, res) => {
  res.send("<h1> Welcome User </h1>");
});

function passwordchecker(req, res, next) {
  const password = "password";
  const username = "mersad";

  if (req.body.password === password && req.body.username === username) {
    next();
  } else if (req.body.password !== password && req.body.username !== username) {
    res.status(400).send("username and password incorrect");
  } else if (req.body.username !== username) {
    res.status(400).send("username incorrect");
  } else if (req.body.password !== password) {
    res.status(400).send("password incorrect");
  }
}

app.get("/endpoint", (req, res) => {
  let yourUrl = "https://api.wheretheiss.at/v1/satellites/25544";

  try {
    axios.get(yourUrl).then((response) => {
      res.status(200).send(
        "Longitude: " +
          response.data.longitude +
          "  " +
          "<br>" +
          "Latitude: " +
          response.data.latitude +
          "<br>" +
          `<iframe
                width="50%%"
                height="600"
                frameborder="0"
                scrolling="no"
                id="gmap_canvas"
                src="https://maps.google.com/maps?height=400&hl=en&q=${response.data.latitude},${response.data.longitude}&t=&z=12&ie=UTF8&iwloc=B&output=embed"
              ></iframe>`
      );
    });
  } catch (error) {
    res.status(500).send("Fehler beim Aufruf der Api");
  }
});

app.listen(port, () => {
  console.log(`Server startet on port ${port}`);
});
