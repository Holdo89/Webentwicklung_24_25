const array = ["Mersad", "Hasan", "Marko", "Thomas", "Ayham", "Pawel"];
let name = whosPaying(array);

console.log(name + " zahlt die Rechnung");

function whosPaying(array) {
  let auswahl = Math.floor(Math.random() * 6);

  return array[auswahl];
}
