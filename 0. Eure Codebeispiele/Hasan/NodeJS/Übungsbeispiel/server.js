import express from "express";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkCredentials);

function checkCredentials(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    if (password === "HelloBoy" && username === "Hasan") {
        res.send ("Password is correct!");
        next();
    } else {
        res.status(400).send("Wrong password");
    }
}



app.get("/",(req, res) => {
    res.send("<h1>Home Page</h1>"); 
});


app.listen(port, () => {
    console.log(`server started on port ${port}`);
});