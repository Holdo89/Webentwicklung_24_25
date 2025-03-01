import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("./static"));
// um css zu finden

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, index.html));
  // die Datei wird mit CSS zurückgeschickt
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
