/*let max = 6;
let min = 1;
let randomnum = Math.random()*(max-min) +min;
console.log(randomnum)

let maxOfArray = Math.max (1,2,3,4,5,6,7,8,9);
console.log(maxOfArray)*/

function whosPaying(names) {
    let randomNum = Math.floor(Math.random() * names.length); 
    return names[randomNum] + " zahlt heute essen."; 
}

const pay = ["Pavel", "Marko", "Thomas", "Hasan", "Mersad", "Ayham"];
console.log(whosPaying(pay)); 


