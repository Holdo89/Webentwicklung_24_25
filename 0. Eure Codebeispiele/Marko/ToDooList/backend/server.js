import express, { response } from "express";
import cors from "cors";
const app = express();
const port = 8090;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todo", (req, res) => {
  res.json(todo);
});

app.listen(port, () => {
    console.log(`Server starting`);
  });

let todo = [
  {
    id: 1,
    todo: "Coden",
  },
  {
    id: 2,
    todo: "Kochen",
  },
  {
    id: 3,
    todo: "Lesen",
  },
];


