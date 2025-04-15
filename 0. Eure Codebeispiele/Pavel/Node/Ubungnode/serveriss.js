import express from 'express';
import axios from 'axios';
import cors from 'cors';

const port = 3000;
const app = express();

app.use(cors());

app.get("/iss", (req, res) => {
  const issUrl = "https://api.wheretheiss.at/v1/satellites/25544";

  axios.get(issUrl)
    .then((response) => {
      const { latitude, longitude } = response.data;
      res.status(200).json({ latitude, longitude });
    })
    .catch((error) => {
      res.status(500).json({ error: "Unexpected error: " + error.message });
    });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});