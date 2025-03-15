import express from "express";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passwordchecker);
app.use(usernamechecker);

app.get("/", (req, res) => {
  res.send("<h1> Mersad");
});

function passwordchecker(req, res, next) {
  const password = "Mersad";
  const username = "Mersad";

  if (req.body.password === password && req.body.username === username) {
    next();
  } else if (req.body.username !== username) {
    res.status(400).send("username incorrect");
  } else {
    res.status(400).send("password incorrect");
  }
}

app.listen(port, () => {
  console.log(`Server startet on port ${port}`);
});
