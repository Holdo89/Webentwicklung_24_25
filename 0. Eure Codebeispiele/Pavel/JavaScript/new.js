let name = prompt("Give me Name: ");
let nameLowerCase = name.toLowerCase();
let lastIndexOfSpace = name.lastIndexOf(" ");
let vorname = name[0].toUpperCase() + nameLowerCase.slice(1, lastIndexOf);
let nachname =
  name[lastIndexOfSpace].toUpperCase() +
  nameLowerCase.slice(lastIndexOfSpace + 2);
alert("My name after formating: " + vorname + " " + nachname);

let temperature = prompt("Bitte gib die Temperatur in Grad Celsius ein:");

if (temperature <= 10) {
  console.log("Es ist kalt.");
} else if (temperature > 10 && temperature <= 25) {
  console.log("Es ist angenehm.");
} else {
  console.log("Es ist heiß.");
}

alert(temperature);

let Buchstabe = prompt("Schrebe eine Buchstabe: ");
switch (Buchstabe) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "o":
    console.log("Bucshtabe ist ein Vokal");
    break;
  default:
    console.log("Ist ein KOnstannt");
}
let zahl1 = parseFloat(prompt("Gib die erste Zahl ein:"));
let zahl2 = parseFloat(prompt("Gib die zweite Zahl ein:"));
let zahl3 = parseFloat(prompt("Gib die dritte Zahl ein:"));

let größte =
  zahl1 > zahl2 && zahl1 > zahl3 ? zahl1 : zahl2 > zahl3 ? zahl2 : zahl3;

console.log("Die größte Zahl ist: " + größte);
alert("Die größte Zahl ist: " + größte);

let zahl = parseFloat(prompt("Gib eine Zahl ein:"));

if (!Number.isInteger(zahl)) {
  console.log("Die Zahl ist eine Kommazahl.");
  alert("Die Zahl ist eine Kommazahl.");
} else if (zahl % 2 === 0) {
  console.log("Die Zahl ist gerade.");
  alert("Die Zahl ist gerade.");
} else {
  console.log("Die Zahl ist ungerade.");
  alert("Die Zahl ist ungerade.");
}
