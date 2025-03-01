import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/file", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/register", (req, res) => {
  res.send("post request successfull");
  res.sendStatus(201);
});

app.put("/user/Mersad", (req, res) => {
  res.send("put successfull");
  res.sendStatus(200);
});

app.delete("/user/Mersad", (req, res) => {
  res.send("delete successfull");
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
