// 1. Schreibe eine Funktion, die die Summe von zwei Zahlen zurückgibt.
sum(5, 3);
function sum(a, b) {
  let sum = a + b;
  console.log("1) " + sum);
}
// 2. Schreibe eine Funktion, die überprüft, ob eine Zahl gerade oder ungerade ist.
modulo(4);
function modulo(a) {
  if (a % 2 == 0) {
    console.log("2) gerade");
  }
}
// 3. Schreibe eine Funktion, die einen String umkehrt.
let word = "mersad";
umgekehrt(word);

function umgekehrt() {
  let newWord = "";
  for (let i = word.length - 1; i >= 0; i--) {
    newWord = newWord + word[i];
  }
  console.log("3) " + newWord);
}
// 4. Schreibe eine Funktion, die die größte Zahl in einem Array findet.
let array = [2, 5, 7, 3, 9, 1];
greatestNumber(array);

function greatestNumber(array) {
  let max = array[0];
  array.forEach((element) => {
    if (element > max) {
      max = element;
    }
  });
  console.log("4) max: " + max);
}

// 5. Schreibe eine Funktion, die die Anzahl der Vokale in einem String zählt.
let name = "mersad";
count(name);

function count(name) {
  let count = 0;
  for (let i = 0; i < name.length; i++) {
    if (
      name[i] == "a" ||
      name[i] == "e" ||
      name[i] == "i" ||
      name[i] == "o" ||
      name[i] == "u"
    ) {
      count++;
    }
  }
  console.log("5) Anzahl Vokale: " + count);
}

// 6. Schreibe eine Funktion, die überprüft, ob ein String ein Palindrom ist.
let first = "otto";
verkehrt(first);

function verkehrt(word) {
  let newWord = "";
  for (let i = word.length - 1; i >= 0; i--) {
    newWord = newWord + word[i];
  }
  if (first == newWord) {
    console.log("6) Palindrom");
  } else {
    console.log("6) kein Palindrom");
  }
}
// 7. Schreibe eine Funktion, die ein Array von Zahlen in aufsteigender Reihenfolge sortiert.
let numbers = [4, 2, 6, 1, 3];
numbersUp(numbers);
function numbersUp(numbers) {
  let num = numbers.sort();
  console.log("7) " + num);
}
// 8. Schreibe eine Funktion, die Duplikate aus einem Array entfernt.
let arr = [1, 2, 3, 2, 4, 5, 3];
unique(arr);

function unique(array) {
  let uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!uniqueArr.includes(arr[i])) {
      uniqueArr.push(arr[i]);
    }
  }
  console.log("8) " + uniqueArr);
}

// 9. Schreibe eine Funktion, die einen String in CamelCase umwandelt.
// Bsp: "Das ist ein Test" -> "DasIstEinTest"
let satz = "Das ist ein Test";
leerzeilen(satz);

function leerzeilen(satz) {
  let newSatz = "";
  for (let i = 0; i < satz.length; i++) {
    if (satz[i] == " ") {
      newSatz = newSatz + satz[i + 1].toUpperCase();
      i++;
    } else {
      newSatz = newSatz + satz[i];
    }
  }
  console.log("9) Camelcase: " + newSatz);
}

// 10. Schreibe eine Funktion, die die Fakultät einer Zahl berechnet.
// Fakultät(5) = 5 * 4 * 3 * 2 * 1 = 120
let zahl = 5;
fakultaet(zahl);

function fakultaet(zahl) {
  let ergebnis = 1;
  for (let i = zahl; i > 1; i--) {
    ergebnis = ergebnis * i;
  }
  console.log("10) Fakultät: " + ergebnis);
}
