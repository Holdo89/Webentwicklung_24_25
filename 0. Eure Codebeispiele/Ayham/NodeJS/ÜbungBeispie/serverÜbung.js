import express from 'express';

let app = express();

app.get("/5",(req,res)=>{
    res.send("<div>TEST</div>");
});

app.listen(8090,() => {
    console.log('STARTET');
})
