// Erstelle eine Funktion die die Fibonacci-Folge bis zu einem bestimmten Wert generiert
// Beispiel: generateFibonacci(10)
// Output: 0,1,1,2,3,5,8,13,21,34
function fib(n) {
    if (n <= 1) {
        return 1;
    }
    const fibArray = [0, 1]; 
    for (let i = 2; i <= n; i++) {
        fibArray[i] = fibArray[i - 1] + fibArray[i - 2];
    }
    return fibArray
}

console.log(fib(10));