// 1. Funktion, die die ersten n Zahlen der Fibonacci-Folge generiert
function fibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, n);
}

// 2. Funktion, die prüft, ob zwei Strings Anagramme sind
function isAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;

    function sortString(s) {
        let arr = s.split("");
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] > arr[j]) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr.join("");
    }
    
    return sortString(str1.toLowerCase()) === sortString(str2.toLowerCase());
}

// 3. Funktion, die die Anzahl der Vorkommen eines Zeichens in einem String zählt
function countChar(str, char) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count++;
        }
    }
    return count;
}

// 4. Funktion, die die Primzahlen bis zu einer bestimmten Zahl findet
function findPrimes(n) {
    let primes = [];
    for (let i = 2; i <= n; i++) {
        let isPrime = true;
        for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }
    return primes;
}

// 5. Funktion, die zwei Arrays zusammenführt und sortiert
function mergeAndSort(arr1, arr2) {
    let merged = arr1.concat(arr2);
    for (let i = 0; i < merged.length; i++) {
        for (let j = i + 1; j < merged.length; j++) {
            if (merged[i] > merged[j]) {
                let temp = merged[i];
                merged[i] = merged[j];
                merged[j] = temp;
            }
        }
    }
    return merged;
}

// 6. Funktion, die die Anzahl der Wörter in einem Satz zählt
function countWords(sentence) {
    let words = sentence.split(" ");
    let count = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i].trim() !== "") {
            count++;
        }
    }
    return count;
}

// 7. Funktion, die den größten gemeinsamen Teiler (ggT) von zwei Zahlen berechnet
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// 8. Funktion, die das Datum des nächsten Montags zurückgibt
function nextMonday() {
    let today = new Date();
    let day = today.getDay();
    let daysUntilMonday = (8 - day) % 7;
    today.setDate(today.getDate() + daysUntilMonday);
    return today;
}

// 9. Funktion, die prüft, ob ein String eine gültige URL ist
function isValidURL(str) {
    let regex = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/;
    return regex.test(str);
}

// 10. Funktion, die die Elemente eines Arrays in umgekehrter Reihenfolge anordnet
function reverseArray(arr) {
    let reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

// Tests:
console.log(fibonacci(5)); // [0, 1, 1, 2, 3]
console.log(isAnagram("listen", "silent")); // true
console.log(countChar("Hallo Welt", "l")); // 3
console.log(findPrimes(10)); // [2, 3, 5, 7]
console.log(mergeAndSort([3, 1, 4], [8, 5, 2])); // [1, 2, 3, 4, 5, 8]
console.log(countWords("Dies ist ein Test.")); // 4
console.log(gcd(48, 18)); // 6
console.log(nextMonday()); // Nächstes Montag-Datum
console.log(isValidURL("https://www.google.com")); // true
console.log(reverseArray([1, 2, 3, 4])); // [4, 3, 2, 1]
