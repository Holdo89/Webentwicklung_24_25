import express, { response } from "express";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passwordchecker);

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
  let url = "https://wheretheiss.at/";

  try {
    axios.get(url).then((response) => {
      res
        .status(200)
        .send(
          "Longitude: " +
            response.data.Longitude +
            "Latitude: " +
            response.data.Latitude
        );
    });
  } catch (error) {
    res.status(500).send("Fehler beim Aufruf der Api");
  }
});

app.listen(port, () => {
  console.log(`Server startet on port ${port}`);
});
