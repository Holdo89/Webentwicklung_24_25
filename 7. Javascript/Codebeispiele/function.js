
let a = "dominic";
let b = überschreibe(a)
console.log(a)
console.log(b)


function überschreibe(a){
    a = a.toUpperCase();
    console.log("inside",a)
    return a
}