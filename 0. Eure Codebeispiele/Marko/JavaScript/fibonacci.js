// Erstelle eine Funktion die die Fibonacci-Folge bis zu einem bestimmten Wert generiert
// Beispiel: generateFibonacci(10)
// Output: 0,1,1,2,3,5,8,13,21,34



let i = 0;
let j = 1;
let nexti= 0;
let array =[];


function generateFibonacci(nummer) {
    while (i < nummer) {
      array.push(i);
      nexti = i + j;
      i = j;
      j = nexti;
    }
    console.log(array);
 }
  
  generateFibonacci(20);



  