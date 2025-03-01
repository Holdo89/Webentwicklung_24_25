// 1. Funktion, die prüft, ob zwei Arrays identische Elemente in der gleichen Reihenfolge enthalten
function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

// 2. Funktion, die die Anzahl der Vorkommen jedes Zeichens in einem String zählt und als Objekt zurückgibt
function charFrequency(str) {
    let frequency = {};
    
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (frequency[char]) {
            frequency[char]++;
        } else {
            frequency[char] = 1;
        }
    }
    return frequency;
}

// 3. Funktion, die die Primfaktoren einer Zahl findet
function primeFactors(n) {
    let factors = [];
    let divisor = 2;

    while (n >= 2) {
        if (n % divisor === 0) {
            factors.push(divisor);
            n /= divisor;
        } else {
            divisor++;
        }
    }
    return factors;
}

// 4. Funktion, die ein Array von Objekten nach einem bestimmten Schlüssel sortiert
function sortByKey(arr, key) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i][key] > arr[j][key]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// Tests:
console.log(areArraysEqual([1, 2, 3], [1, 2, 3])); // true
console.log(areArraysEqual([1, 2, 3], [1, 3, 2])); // false
console.log(charFrequency("hello")); // { h: 1, e: 1, l: 2, o: 1 }
console.log(primeFactors(60)); // [2, 2, 3, 5]
console.log(sortByKey([{ name: "Anna", age: 30 }, { name: "Ben", age: 25 }], "age")); 
// [{ name: "Ben", age: 25 }, { name: "Anna", age: 30 }]
