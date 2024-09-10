import express from "express";
import mysql from "mysql";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

const __dirname = dirname(fileURLToPath(import.meta.url));

let userId = 0;

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "",
  database: "todos",
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as ID " + db.threadId);
});

// Endpoint to fetch all todos
app.post("/credentials", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = "SELECT * FROM users WHERE username = '"+username+"' AND password = '"+password+"'";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching todos: " + err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results.length>0){
      userId = results[0].id
      console.log("userid:", userId)
      res.redirect("/todos")
    }
    else{
      res.redirect("/login")
    }
  });
});

// Endpoint to fetch all todos
app.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/pages/login.html`);
});

// Endpoint to fetch all todos
app.get("/todos", (req, res) => {
  const query = "SELECT * FROM todos WHERE userId = "+userId;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching todos: " + err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.render(`${__dirname}/pages/index.ejs`, {
      listTitle: "Today",
      listItems: results,
    });
  });
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  const query = "UPDATE todos SET title = '" + item + "' WHERE id = " + id;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching todos: " + err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  res.redirect("/todos")
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const query = "INSERT INTO todos (title, userid) VALUES ('"+item+"', "+userId+")";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching todos: " + err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  res.redirect("/todos")
  });
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  const query = "DELETE FROM todos WHERE id = "+id;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching todos: " + err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  res.redirect("/todos")
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
