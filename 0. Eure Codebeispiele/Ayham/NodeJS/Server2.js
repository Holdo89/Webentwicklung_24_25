import express from "express";
import path from "path";
import {dirname} from "path";
import { fileURLToPath } from "url";

const file = dirname(fileURLToPath(import.meta.url));
const fileCss = dirname(fileURLToPath(import.meta.url));
let app = express();

app.use(express.static('public'));

app.get('/file2', (req,res) =>{
    res.sendFile(path.join(file ,'/public/index.html'));
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/regist', (req, res) =>{
    console.log("username:", req.body.username);
    res.sendStatus(200);
    res.send("user successful createt: " + req.body.username);
    
});

app.post('/register', (req, res) =>{
    let user = "Ayham";
    let pass = "123456";
    req.body.password === pass && req.body.username === user ? 
    res.status(200).send("user successful createt: " + req.body.username) :
    res.status(400).send("Password Incorrect!!");
});



app.get('/file', (req,res) =>{
    res.sendFile(file + "/public/index.html")
});




app.get('/', (req,res) =>{
    res.send("<h3>WELLCOM BACK</h3>")
});

app.get('/file1', (req,res) =>{
    res.sendFile(fileCss + "/public/index.css")
});
app.get("/about", (req,res) =>{
    res.send("<h3>ABOUT US</h3>")
});
app.listen(8090, () => {
    console.log("SERVER IS RUNNING!!!")
});

app.put('/user', (req,res)=>{
    res.sendStatus(200);
    console.log('PUT IS SUCCESSFUL');
});
app.post('/post', (req,res)=>{
    res.sendStatus(200);
    console.log('POST IS SUCCESSFUL');
});
app.patch('/patch', (req,res)=>{
    res.sendStatus(200);
    console.log('PATCH IS SUCCESSFUL');
});
app.delete('/delete', (req,res)=>{
    res.sendStatus(200);
    console.log('DELET IS SUCCESSFUL');
});