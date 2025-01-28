// 1. Schreibe eine Funktion, die prüft, ob zwei Arrays identische Elemente in der gleichen Reihenfolge enthalten.
function compare(arr1,arr2){
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

let arr1 = ['A',0,1,2,'S'];
let arr2 = ['A',0,2,1,'S'];
let arr3 = ['A',0,1,2,'S'];
let arr4 = ['A',0,1,'2','S'];
console.log(compare(arr1,arr2));
console.log(compare(arr1,arr3));
console.log(compare(arr4,arr3));

// 2. Schreibe eine Funktion, die die Anzahl der Vorkommen jedes Zeichens in einem String zählt und als Objekt zurückgibt.

// 3. Schreibe eine Funktion, die die Primfaktoren einer Zahl findet.

// 4. Schreibe eine Funktion, die ein Array von Objekten nach einem bestimmten Schlüssel sortiert.
