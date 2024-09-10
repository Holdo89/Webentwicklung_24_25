const fs = require('fs');

let message = "Hallo von Dominic"

fs.writeFile('message.txt', message,  (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  }); 

let text = "";
  fs.readFile("./message.txt","utf8", (err, data)=>{
    if(err) throw err;
    console.log("File was read")
    text=data;
    console.log("das ist der Text:", data)
  })

  fs.appendFile("message.txt", "\nHallo von Mario \nHallo von Marwa \nHallo von Matthias \nHallo von Wolfgang", (err)=>{
    if (err) throw err;
    console.log('The file has been appended!');
  })


