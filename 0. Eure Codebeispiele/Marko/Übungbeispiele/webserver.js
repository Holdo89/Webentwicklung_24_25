import express from "express";
const app = express();
const port = 8090;

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1>");
});

app.listen(port, () => {
  console.log(`Server starting`);
});
