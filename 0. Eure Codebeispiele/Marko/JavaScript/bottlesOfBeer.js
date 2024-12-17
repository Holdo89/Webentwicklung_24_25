// Schreibe ein Programm bei dem der Benutzer eine Zahl über einen Prompt eingibt.
// Als Ergebnis wird in einem Alert der Songtext “99 bottles of beer” ausgegeben.
// Die Anzahl der Flaschen zu Beginn des Songtexts wird über die eingegebene Zahl bestimm
// Nutze dafür eine for loop!
// Beispiel Output: 21 bottles of beer on the wall, 21 bottles …..

let inputnumb = 90;
num = inputnumb;
let i = 0;

for (i = 0; i < inputnumb; i++) {
  console.log(
    num +
      " bottles of beer on the wall, " +
      num +
      " bottles of beer. Take one down and pass it around, " +
      (num - 1) +
      " bottles of beer on the wall."
  );
  num--;
}
