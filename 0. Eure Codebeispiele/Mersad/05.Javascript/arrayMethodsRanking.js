const { forEach } = require("async");

const participants = [
  { name: "Alice", points: 120 },
  { name: "Bob", points: 80 },
  { name: "Charlie", points: 95 },
  { name: "David", points: 110 },
  { name: "Eva", points: 60 },
];

//   Aufgaben:
// Verwende die forEach-Methode, um jeden Teilnehmer und seine Punktzahl auszugeben.

console.log("alle Teilnehmer: ");
participants.forEach(myFunction);
function myFunction(element) {
  console.log(element);
}
console.log("Neue Zeile: ");

// Verwende die map-Methode, um ein neues Array zu erstellen, das nur die Namen der Teilnehmer enthält.
console.log("nur Namen: ");
const nurNamen = participants.map((element) => element.name);
console.log(nurNamen);
console.log("Neue Zeile: ");

// Verwende die filter-Methode, um ein neues Array zu erstellen, das nur die Teilnehmer enthält, die mehr als 100 Punkte haben.
console.log("alle über 100 Punkten: ");
const filteredArray = participants.filter((element) => element.points > 100);
filteredArray.forEach(myFunction);
function myFunction(element) {
  console.log(element);
}
console.log("Neue Zeile: ");

// Verwende die sort-Methode, um die Liste der Teilnehmer nach ihren Punktzahlen zu sortieren (aufsteigend).
console.log("aufsteigend sortiert: ");
const sort = participants.sort((a, b) => a.points - b.points);
sort.forEach(myFunction);
function myFunction(element) {
  console.log(element);
}
console.log("Neue Zeile: ");

// Verwende die reverse-Methode, um die Liste in absteigender Reihenfolge zu sortieren.
console.log("absteigend sortiert: ");
const sort2 = participants.sort((a, b) => b.points - a.points);
sort2.forEach(myFunction);
function myFunction(element) {
  console.log(element);
}
console.log("Neue Zeile: ");

// Gib die sortierte Rangliste aus, die sowohl den Namen als auch die Punktzahl jedes Teilnehmers enthält.
console.log("aufsteigend sortiert mit Punkten");
const sort3 = participants.sort((a, b) => a.points - b.points);
sort3.forEach(myFunction);
function myFunction(element) {
  console.log(element.name + " " + element.points);
}
