import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1> Mersad");
});

app.use(passwortchecker);

function passwortchecker(req, res, next) {}

app.listen(port, () => {
  console.log(`Server startet on port ${port}`);
});
