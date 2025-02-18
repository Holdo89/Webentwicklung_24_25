const fs= require('fs');

let message="Hallo von Marko"

fs.writeFile('message.txt', message, (err)=> {
    if (err) throw err;
    console.log('The file has been saved!');
});
fs.readFile('message.txt')
