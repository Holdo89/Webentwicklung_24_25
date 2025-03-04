import express from "express";
const app= express();
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";
const __dirname=dirname(fileURLToPath(import.meta.url));
app.get("/File",(req,res)=>{
    res.sendFile(__dirname + "/static/index.html");
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send("<h1>Welcome 2 the hp </h1>")
});
app.get("/about",(req,res)=>{
    res.send("<h1> About us <h1>")
})

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000/")
    
});
//app.post("/register",(req,res)=>{
   // res.send("Postrequest succesfull")
   // res.sendStatus(201);
    
//});
app.put("/user/thomas",(req,res)=>{
    res.send("put request succesfull")
    res.sendStatus(200);
});
app.delete("/user/thomas",(req,res)=>{
    res.sendStatus(200);
});
app.use(express.static("./static"))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/register",(req,res)=>{
    console.log("username:",req.body.username);
    
    if(req.body.password==="password"){
        console.log("yooo")
        res.status(201).send("User successfully created:"+ req.body.username);
        
    }
    else{
        console.log("Wrong Password") 
        res.status(201).send("Wrong password:"+ req.body.username);
        
    }
});




