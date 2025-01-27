// 1. Schreibe eine Funktion, die die Summe von zwei Zahlen zurückgibt.
function sum(n1,n2=0){
    return n1+n2;
}
console.log(sum(2,5));

// 2. Schreibe eine Funktion, die überprüft, ob eine Zahl gerade oder ungerade ist.
function gerade(n){
    n % 2 == 0 ? console.log('Es ist gerade Zhal') :console.log('Es ist ungerade Zhal')
}
gerade(6);

// 3. Schreibe eine Funktion, die einen String umkehrt.
function umkehrt(str){
    return str.split('').reverse().join('');
}
console.log(umkehrt('Hello'));
// 4. Schreibe eine Funktion, die die größte Zahl in einem Array findet.
function maxi(arr){
    return console.log(Math.max(...arr));
}
maxi([1,2,0,3,8,4,9]);
// 5. Schreibe eine Funktion, die die Anzahl der Vokale in einem String zählt.
function coun(str){
    const char = ['A','E','I','O','U'];
    let count = 0;
    let upp = str.toUpperCase();
    let arr = upp.split('');
    for (const v of arr) {
        if(char.includes(v))
        count++;
    }
    return console.log(count);
}
coun('Hello');

// 6. Schreibe eine Funktion, die überprüft, ob ein String ein Palindrom ist.
function pal(str){
    const pl1 = umkehrt(str);
    return str == pl1 ? true : false;
}
console.log(pal('mam'));

// 7. Schreibe eine Funktion, die ein Array von Zahlen in aufsteigender Reihenfolge sortiert.

// 8. Schreibe eine Funktion, die Duplikate aus einem Array entfernt.

// 9. Schreibe eine Funktion, die einen String in CamelCase umwandelt.
// Bsp: "Das ist ein Test" -> "DasIstEinTest"

// 10. Schreibe eine Funktion, die die Fakultät einer Zahl berechnet.
// Fakultät(5) = 5 * 4 * 3 * 2 * 1 = 120
