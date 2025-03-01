import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("<h2> CodersBay</h2>");
});

app.get("/about", (req, res) => {
    res.send("<h1>Hi</h1>");
});

app.use((req, res)=>{
    res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});

