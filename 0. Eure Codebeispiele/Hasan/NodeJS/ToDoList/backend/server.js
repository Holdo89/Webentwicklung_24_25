import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server startet on port ${port}`);
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

let todos = [
  {
    id: 1,
    todo: "Hausaufgaben",
  },
  {
    id: 2,
    todo: "Training",
  },
];