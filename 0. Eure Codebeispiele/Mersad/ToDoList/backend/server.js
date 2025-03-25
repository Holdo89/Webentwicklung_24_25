import express, { response } from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server startet on port ${port}`);
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

let todos = [
  {
    id: 1,
    todo: "lernen",
  },
  {
    id: 1,
    todo: "programmieren",
  },
];
