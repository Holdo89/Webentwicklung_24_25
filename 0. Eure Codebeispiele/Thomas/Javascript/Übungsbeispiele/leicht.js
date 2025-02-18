const { forEach } = require("async");

// 1. Schreibe eine Funktion, die die Summe von zwei Zahlen zurückgibt.
function sum(zahl1,zahl2){
    return zahl1+zahl2
}
console.log(sum(11,22))
let ergebnis=sum(10,30);
console.log(ergebnis)


// 2. Schreibe eine Funktion, die überprüft, ob eine Zahl gerade oder ungerade ist.
function gerade(zahl){
    
    if(zahl %2 == 0)
        console.log("Zahl ist gerade")
    else{
        console.log("Zahl ist ungerade")
    }
}

// 3. Schreibe eine Funktion, die einen String umkehrt.
function stringUmkehren(str){
    let umgekehrterString = '';
    for(let i =str.length -1; i >=0; i--){
        umgekehrterString+=str[i];
    }return umgekehrterString;
}
console.log(stringUmkehren("Halloooo"));

// 4. Schreibe eine Funktion, die die größte Zahl in einem Array findet.
    function größteZahlFinden(arr){
        let größteZahl=arr[0];
        for(let i =1; i<arr.length;i++)
            if(arr[i]>größteZahl){
                größteZahl=arr[i]
            }return größteZahl;
    }
    let gibNumber=größteZahlFinden([10,88,55,77])
    console.log(gibNumber)
// 5. Schreibe eine Funktion, die die Anzahl der Vokale in einem String zählt.
function anzahlAnVocalen(String){
    let count =0;
    let vocals="aeiouAEIOU"
    for(let char of String){
        if(vocals.includes(char)){
            count ++;
        }
    }return count;
}
console.log(anzahlAnVocalen("Hallo ich bin der FRAAANNNZZIII"));

// 6. Schreibe eine Funktion, die überprüft, ob ein String ein Palindrom ist.
function palindrom(String){
    String=String.toLowerCase();
    let reversed="";
    for(let i=String.length-1; i>=0; i--){
        reversed= reversed+String[i];
    }
return String===reversed
}
let Pali=palindrom("Anna");
console.log(Pali)
// 7. Schreibe eine Funktion, die ein Array von Zahlen in aufsteigender Reihenfolge sortiert.
function arrayNachZahlen(Arr){
    return Arr.sort(function(a,b){
        return a-b;
    }
    )}
    console.log(arrayNachZahlen([11,4,7,44,2,1]));
// 8. Schreibe eine Funktion, die Duplikate aus einem Array entfernt.
function removeDublicates(arr){
    let dublicate=[];
    for(let i =0; i<arr.length;i++){
        let isdublicate=false;
        for(let j=0; j<dublicate.length;j++){
            if(arr[i]===dublicate[j]){
            isdublicate=true;
        break;
        }}
if(!isdublicate){
    dublicate.push(arr[i]);
}

}return dublicate;
}



// 9. Schreibe eine Funktion, die einen String in CamelCase umwandelt.
// Bsp: "Das ist ein Test" -> "DasIstEinTest"
function toCamelCase(str){
    let words=str.split(/[_\s-]+/);
    for(let i=1;i<words.length;i++){
        words[i]=words[i].charAt(0).toUpperCase()+words[i].slice(1).toLowerCase();
    }
    return words.join('');
}
console.log(toCamelCase("hallo_world_this_is-a-game"));

// 10. Schreibe eine Funktion, die die Fakultät einer Zahl berechnet.
// Fakultät(5) = 5 * 4 * 3 * 2 * 1 = 120
function factorial(a){
    let zahl=1;
    for(let i=1;i<=a;i++){
        zahl=zahl *i;
}return zahl;

}
let cooleZahl=factorial(9)
console.log(cooleZahl)

let originalArray=[1,2,7,3,3,4,4,7];
console.log(removeDublicates(originalArray))
let a=removeDublicates(originalArray)
console.log(arrayNachZahlen(a));




