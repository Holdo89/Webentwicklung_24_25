let name = prompt("Bitte Namne eingeben"); // könnte "hAsAN GuDiC" stehen
let lowerCase = name.toLowerCase(); //hier wurde deklariert, dass alles in klein geschrieben wir "hasan gudic"
let lastIndexOfSpace = name.lastIndexOf(" "); //es wird nach dem Leerzeichen im "name" gesucht;
let vorname = name[0].toUpperCase() + lowerCase.slice(1, lastIndexOfSpace);
let nachname = name[lastIndexOfSpace+1].toUpperCase() + lowerCase.slice(lastIndexOfSpace+2);
alert ("Das ist mein Name: "+ vorname + " " + nachname);