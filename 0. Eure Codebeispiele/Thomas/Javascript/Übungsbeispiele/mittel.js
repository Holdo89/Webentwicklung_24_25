// 1. Schreibe eine Funktion, die die ersten n Zahlen der Fibonacci-Folge generiert.

const { url } = require("inspector");

// 2. Schreibe eine Funktion, die prüft, ob ein String eine Anagramm eines anderen ist.
//Bsp: 2 Wörter nutzen die selben Buchstaben, aber in einer anderen Reihenfolge. "listen" und "silent" sind Anagramme.

// 3. Schreibe eine Funktion, die die Anzahl der Vorkommen eines bestimmten Zeichens in einem String zählt.
    function SignInString(str,char){
        let  count =0;
        for(let i=0;i<str.length;i++){
            if(str[i]===char){
                count++;
            }
        }return count;
    }
    console.log(SignInString("Hallllloooo!!!!","!"))

// 4. Schreibe eine Funktion, die die Primzahlen bis zu einer bestimmten Zahl findet.


// 5. Schreibe eine Funktion, die zwei Arrays zusammenführt und sortiert.

function mergeAndSort(array1,array2){
    return[...array1,...array2].sort((a,b)=> a-b)
}
console.log(mergeAndSort([2,3,4],[4,1,5]))

// 6. Schreibe eine Funktion, die die Anzahl der Wörter in einem Satz zählt.
function wörterZählen(Str){
    return Str.trim().split(/\s+/).length;
}
console.log(wörterZählen("hallo welt das welt i "))

// 7. Schreibe eine Funktion, die das größte gemeinsame Teiler (ggT) von zwei Zahlen berechnet.


// 8. Schreibe eine Funktion, die das Datum des nächsten Montags zurückgibt.


// 9. Schreibe eine Funktion, die prüft, ob ein String eine gültige URL ist.
function getUrl(str){
    try{
        new URL(str);
        return true;
    }catch (e){
        return false;
    }
    }
    console.log(getUrl("https://www.google.com"));
    console.log(getUrl("das ist fake"));


// 10. Schreibe eine Funktion, die die Elemente eines Arrays in umgekehrter Reihenfolge anordnet.
function revArray(arr){
    return arr.reverse();
}
function revvArray(arr){
    result=[];
    for(let i= arr.length -1;  i>=0;i-- ){
        result.push(arr[i])
    }
    return result;

}



console.log(revvArray([5,4,3,2,1]))

function hello(name,country){
    console.log(`Hello ${name} aus ${country}`);
}
hello('thomas','Österreich')



