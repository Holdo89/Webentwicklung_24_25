// Erstelle eine Funktion die die Fibonacci-Folge bis zu einem bestimmten Wert generiert
// Beispiel: generateFibonacci(10)
// Output: 0,1,1,2,3,5,8,13,21,34



function Fibonacci ( number){
   let fibo = [0,1];
   for(let i = 2; i < number;i++){

fibo[i] = fibo[i-1] + fibo [i-2];
 }
return fibo.slice(0, number)
}

console.log(Fibonacci(10))