import express from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(checkCredentials);

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

app.get("/iss",(req, res) => { 
    let apiurl = "https://api.wheretheiss.at/v1/satellites/25544";
    try {
        axios.get(apiurl).then((response) => {
            res.status(200).send("Here the latitude & longitude from the ISS"+response.data.longitude+response.data.latitude);
        });
     } catch (error) {
        res.status(500).send("Fehler beim Aufruf der Api");

        }
    });

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});