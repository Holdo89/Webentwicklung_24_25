// 1. Schreibe eine Funktion, die die ersten n Zahlen der Fibonacci-Folge generiert.
function Fibonacci(n){
    let fibo= [0,1];
    for(let i = 2;i<n; i++){
        fibo.push(fibo[i-1] + fibo[i-2]);
}
return fibo.slice(0,n)
}
console.log(Fibonacci(10));
// 2. Schreibe eine Funktion, die prüft, ob ein String eine Anagramm eines anderen ist.
//Bsp: 2 Wörter nutzen die selben Buchstaben, aber in einer anderen Reihenfolge. "listen" und "silent" sind Anagramme.

// 3. Schreibe eine Funktion, die die Anzahl der Vorkommen eines bestimmten Zeichens in einem String zählt.

// 4. Schreibe eine Funktion, die die Primzahlen bis zu einer bestimmten Zahl findet.

// 5. Schreibe eine Funktion, die zwei Arrays zusammenführt und sortiert.

// 6. Schreibe eine Funktion, die die Anzahl der Wörter in einem Satz zählt.

// 7. Schreibe eine Funktion, die das größte gemeinsame Teiler (ggT) von zwei Zahlen berechnet.

// 8. Schreibe eine Funktion, die das Datum des nächsten Montags zurückgibt.

// 9. Schreibe eine Funktion, die prüft, ob ein String eine gültige URL ist.

// 10. Schreibe eine Funktion, die die Elemente eines Arrays in umgekehrter Reihenfolge anordnet.
