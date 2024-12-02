let name = prompt("Bitte Namen eingeben");
let nameLowerCase = name.toLowerCase();
let lastIndexOfSpace = name.lastIndexOf(" ");
let vorname = name[0].toUpperCase() + nameLowerCase.slice(1, lastIndexOf);
let nachname =
  name[lastIndexOfSpace + 1].toUpperCase() +
  nameLowerCase.slice(lastIndexOfSpace + 2);
alert("Mein Name schön formatiert: " + vorname + " " + nachname);

let Temperatur = prompt("Gib bitte die Temperatur ein");
if (Temperatur < 10) {
  console.log("Es ist kalt");
} else if (Temperatur > 10 && Temperatur < 25) console.log("Es ist angenehm");
else {
  console.log("Es ist heiß");
}

let Buchstabe = prompt("Bitte gib einen Buchstaben ein");
switch (Buchstabe) {
  case "a":
  case "e":
  case " i":
  case "o":
  case "u":
    console.log("Buchstabe ist ein Vokal");
    break;
  default:
    console.log("Buchstabe ist ein Konsonant");
}
let userZahl = prompt("Bitte gib eine Zahl ein");
if (userZahl % 2 == 0) {
  console.log("Es ist eine gerade Zahl");
} else if (userZahl % 2 == 1) {
  console.log("Die Zahl ist ungerade");
} else {
  console.log("Es ist eine KOmmazahl");
}

let UserZahl1 = prompt("Bitte eine Zahl eingeben");
let UserZahl2 = prompt("Bitte gib die zweite Zahl ein");
let UserZahl3 = prompt("Bitte gib die dritte Zahl ein ");
