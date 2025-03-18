import axios from 'axios';
import express from 'express';

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(checkPass);

app.get("/5", (req, res) => {
    res.send("<div>TEST</div>");
});



app.get('/iss', (req, res) => {
    const url =  "https://api.wheretheiss.at/v1/satellites/25544";
    try {
        axios.get(url).then((response) => {
            res.send(`<iframe
            width="50%%"
            height="600"
            frameborder="0"
            scrolling="no"
            id="gmap_canvas"
            src="https://maps.google.com/maps?height=400&hl=en&q=${response.data.latitude},${response.data.longitude}&t=&z=12&ie=UTF8&iwloc=B&output=embed"
            ></iframe>`);
        });
    }
    catch (error) {
        res.send('ERROR');
    }
    
});
function checkPass(req,res,next){
    let pass = req.body.password;
    let user = req.body.username;
    let password = '123456';
    let name = 'Ayham';
    pass != password && user != name ? res.status(404).send('Ops') : next();
};

app.listen(8090, () => {
    console.log('STARTET');
});