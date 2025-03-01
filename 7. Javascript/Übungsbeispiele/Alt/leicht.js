// 1. Funktion, die die Summe von zwei Zahlen zurückgibt
function sum(a, b) {
    return a + b;
}

// 2. Funktion, die überprüft, ob eine Zahl gerade oder ungerade ist
function isEvenOrOdd(n) {
    return n % 2 === 0 ? "gerade" : "ungerade";
}

// 3. Funktion, die einen String umkehrt
function reverseString(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// 4. Funktion, die die größte Zahl in einem Array findet
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// 5. Funktion, die die Anzahl der Vokale in einem String zählt
function countVowels(str) {
    let count = 0;
    let vowels = "aeiouAEIOU";
    for (let i = 0; i < str.length; i++) {
        if (vowels.indexOf(str[i]) !== -1) {
            count++;
        }
    }
    return count;
}

// 6. Funktion, die überprüft, ob ein String ein Palindrom ist
function isPalindrome(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return str.toLowerCase() === reversed.toLowerCase();
}

// 7. Funktion, die ein Array von Zahlen in aufsteigender Reihenfolge sortiert
function sortArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// 8. Funktion, die Duplikate aus einem Array entfernt
function removeDuplicates(arr) {
    let uniqueArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (uniqueArr.indexOf(arr[i]) === -1) {
            uniqueArr.push(arr[i]);
        }
    }
    return uniqueArr;
}

// 9. Funktion, die einen String in CamelCase umwandelt
function toCamelCase(str) {
    let words = str.split(" ");
    let camelCaseStr = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    for (let i = 1; i < words.length; i++) {
        camelCaseStr += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return camelCaseStr;
}

// 10. Funktion, die die Fakultät einer Zahl berechnet
function factorial(n) {
    let result = 1;
    for (let i = n; i > 1; i--) {
        result *= i;
    }
    return result;
}

// Tests:
console.log(sum(3, 5)); // 8
console.log(isEvenOrOdd(4)); // gerade
console.log(reverseString("Hallo")); // ollaH
console.log(findMax([3, 8, 1, 6])); // 8
console.log(countVowels("Hallo Welt")); // 3
console.log(isPalindrome("Anna")); // true
console.log(sortArray([3, 1, 8, 4])); // [1, 3, 4, 8]
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
console.log(toCamelCase("Das ist ein Test")); // DasIstEinTest
console.log(factorial(5)); // 120
