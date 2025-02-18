// 1. Schreibe eine Funktion, die die Summe von zwei Zahlen zurückgibt.
const summe = (a, b) => a + b;

console.log(summe(3, 5));

// 2. Schreibe eine Funktion, die überprüft, ob eine Zahl gerade oder ungerade ist.
function istGerade(n) {
    return n % 2 === 0;
}

console.log(istGerade(4)); 
console.log(istGerade(7)); 
// 3. Schreibe eine Funktion, die einen String umkehrt.
const reverseString = str => str.split("").reverse().join("");

console.log(reverseString("JavaScript"));
// 4. Schreibe eine Funktion, die die größte Zahl in einem Array findet.
function findMax(arr) {
    return Math.max(...arr);
}
console.log(findMax([3, 7, 2, 9, 5])); 



// 5. Schreibe eine Funktion, die die Anzahl der Vokale in einem String zählt.
function countVowels(str) {

    const vowels = "aeiouAEIOU";
    
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    
    return count;
}

console.log(countVowels("Hallo Welt")); // Ausgabe: 3


// 6. Schreibe eine Funktion, die überprüft, ob ein String ein Palindrom ist.
function countVowels(str) {
    return str.split('').filter(char => "aeiouAEIOU".includes(char)).length;
}



console.log(countVowels("Hallo Welt")); // Ausgabe: 3
// 7. Schreibe eine Funktion, die ein Array von Zahlen in aufsteigender Reihenfolge sortiert.
function sortArrayAscending(arr) {
    return arr.sort((a, b) => a - b);
}

const numberss = [5, 3, 8, 1, 2];
console.log(sortArrayAscending(numberss)); 
// 8. Schreibe eine Funktion, die Duplikate aus einem Array entfernt.
function removeDuplicates(arr){
    return[new Set(arr)]
}

const numbers = [1,2,2,3,4,4,5];
console.log(removeDuplicates(numbers));
// 9. Schreibe eine Funktion, die einen String in CamelCase umwandelt.
// Bsp: "Das ist ein Test" -> "DasIstEinTest"
const toCamelCase = str => str.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join('');
console.log(toCamelCase("Das ist ein Test"));

// 10. Schreibe eine Funktion, die die Fakultät einer Zahl berechnet.
// Fakultät(5) = 5 * 4 * 3 * 2 * 1 = 120
const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));
console.log(factorial(5));
