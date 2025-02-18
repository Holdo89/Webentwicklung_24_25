import express from "express";
const app= express();

app.get('/',(req,res)=>{
    res.send("<h1>Welcome 2 mtt </h1>")
});
app.get("/about",(req,res)=>{
    res.send("<h1> About us <h1>")
})

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000/");
});