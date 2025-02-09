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

// 6. Schreibe eine Funktion, die überprüft, ob ein String ein Palindrom ist.

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

// 10. Schreibe eine Funktion, die die Fakultät einer Zahl berechnet.
// Fakultät(5) = 5 * 4 * 3 * 2 * 1 = 120
