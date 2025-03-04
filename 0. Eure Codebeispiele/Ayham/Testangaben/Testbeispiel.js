/**JavaScript Programming Task (Testbeispiel.js):
1. Schreibe eine JavaScript-Funktion, die die Summe von zwei Zahlen berechnet und das Ergebnis in der Konsole ausgibt. (2 Punkte)*/


function Summe (num1, num2){
    return console.log(num1 +num2);
}


/*2. Bonus: Schreibe eine JavaScript-Funktion, die beim Klick auf den Button aufgerufen wird und eine im Textfeld eingegebene Zahl *2 nimmt und das Ergebnis in der Konsole ausgibt. (4 Punkte) */

    
let summe = document.querySelector('.summe');
summe.addEventListener('click', ()=>{
    let tow = document.querySelector('.tow').value;
    console.log(tow*2);
});