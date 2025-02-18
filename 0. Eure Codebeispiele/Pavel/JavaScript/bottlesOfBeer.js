// Schreibe ein Programm bei dem der Benutzer eine Zahl über einen Prompt eingibt.
// Als Ergebnis wird in einem Alert der Songtext “99 bottles of beer” ausgegeben.
// Die Anzahl der Flaschen zu Beginn des Songtexts wird über die eingegebene Zahl bestimm
// Nutze dafür eine for loop!
// Beispiel Output: 21 bottles of beer on the wall, 21 bottles …..

//let bottles = parseInt(prompt("Gib eine Zahl ein:", "99"));

//let songText = "";
//for (let i = bottles; i > 0; i--) {
//songText += i + " bottles of beer on the wall, " + i + " bottles of beer.\n";
//  songText += "Take one down and pass it around, " + (i - 1) + " bottles of beer on the wall.\n\n";
//}

//alert(songText);
let bottles = 99;
let songText = "";
for (let i = bottles; i > 0; i--) {
songText += i + " bottles of beer on the wall, " + i + " bottles of beer.\n";
  songText += "Take one down and pass it around, " + (i - 1) + " bottles of beer on the wall.\n\n";
}

console.log(songText);