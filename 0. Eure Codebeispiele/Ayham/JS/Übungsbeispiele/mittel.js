// 1. Schreibe eine Funktion, die die ersten n Zahlen der Fibonacci-Folge generiert.
function fib(n) {
    if (n <= 1) {
        return 1;
    }
    const fibArray = [0, 1]; 
    for (let i = 2; i <= n; i++) {
        fibArray[i] = fibArray[i - 1] + fibArray[i - 2];
    }
    return fibArray
}

console.log(fib(4));

// 2. Schreibe eine Funktion, die prüft, ob ein String eine Anagramm eines anderen ist.
//Bsp: 2 Wörter nutzen die selben Buchstaben, aber in einer anderen Reihenfolge. "listen" und "silent" sind Anagramme.
function anagram (str1, str2){
    let word1 = str1.toUpperCase().split('').sort().join();
    let word2 = str2.toUpperCase().split('').sort().join();
    return word1 === word2;
}
 console.log( anagram("listen","silent"));
 console.log( anagram("listen","silente"));
// 3. Schreibea eine Funktion, die die Anzahl der Vorkommen eines bestimmten Zeichens in einem String zählt.
function counter (str){
    const char = {'N':0,'E':0};
    let word = str.toUpperCase().split('');
    for(let c of word){
        if(c in char){
            char[c] += 1;
        }
    }
    return char;
}
console.log(counter("silente"));
// 4. Schreibe eine Funktion, die die Primzahlen bis zu einer bestimmten Zahl findet.
/*function Primzahlen (num){
    let numbers = [];
    for(let i = 2; i <= num; i++){
        let isPrim = true;
        if(num % i == 0 ){
            isPrim = false;
        }
        if(isPrim){
            numbers.push(i);
        }  
    }
    return numbers;
}
console.log(Primzahlen(10));*/

// 5. Schreibe eine Funktion, die zwei Arrays zusammenführt und sortiert.
function towArrays(arr1,arr2){
return arr1.concat(arr2).sort();
}
let arr1 = ["Cat", "Lion"];
let arr2 = ["Emil", "Ayham", "Tedy"];
console.log(towArrays(arr1,arr2));

// 6. Schreibe eine Funktion, die die Anzahl der Wörter in einem Satz zählt.

// 7. Schreibe eine Funktion, die das größte gemeinsame Teiler (ggT) von zwei Zahlen berechnet.

// 8. Schreibe eine Funktion, die das Datum des nächsten Montags zurückgibt.

// 9. Schreibe eine Funktion, die prüft, ob ein String eine gültige URL ist.

// 10. Schreibe eine Funktion, die die Elemente eines Arrays in umgekehrter Reihenfolge anordnet.
