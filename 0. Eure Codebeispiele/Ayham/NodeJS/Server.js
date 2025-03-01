import express from "express";
let app = express();

app.get('/', (req,res) =>{res.send("<h3>WELLCOM BACK</h3>")});
app.get("/about", (req,res) =>{res.send("<h3>ABOUT US</h3>")});
app.listen(8090, () => {console.log("SERVER IS RUNNING!!!")});