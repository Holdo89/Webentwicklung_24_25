const fs = require ('fs');
let messege = 'HALLO WORLD';
fs.writeFile('messeage.txt',messege, (err)=> {
    if(err) throw err;
    console.log('DONE');
});
fs.readFile('messege.txt');