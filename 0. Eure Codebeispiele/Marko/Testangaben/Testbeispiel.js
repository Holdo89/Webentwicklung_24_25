//1. Schreibe eine JavaScript-Funktion, die die Summe von zwei Zahlen berechnet und das Ergebnis in der Konsole ausgibt. (2 Punkte)
let a=2;
let b=3;
let c=0;

function sumNumber(a, b){
    c = a+b;
    return c;
}

console.log(sumNumber(a, b));

//2. Bonus: Schreibe eine JavaScript-Funktion, die beim Klick auf den Button aufgerufen wird und eine im Textfeld eingegebene Zahl *2 nimmt und das Ergebnis in der Konsole ausgibt. (4 Punkte) ------2 PUNKTE!!! NICHT VERGESSEN

let button = document.getElementById("myButton");
button.addEventListener("click", function() {
    let inputfield = document.querySelector("input")
    let value = inputfield.value
    console.log("Wert+2: "+value*2)
})
