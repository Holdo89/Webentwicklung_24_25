// Erstelle eine Funktion die die Fibonacci-Folge bis zu einem bestimmten Wert generiert
// Beispiel: generateFibonacci(10)
// Output: 0,1,1,2,3,5,8,13,21,34

generateFibonacci(10);

function generateFibonacci(wert) {
  let zahlen = 0;
  let a = 0;
  let b = 1;
  let ergebnis;
  while (zahlen < wert) {
    ergebnis = a + b;
    console.log(a);
    a = b;
    b = ergebnis;
    zahlen++;
  }
}

generateFibonacci2(10);

function generateFibonacci2(wert) {
  let array = [wert];
  let zahlen = 0;
  let a = 0;
  let b = 1;
  let ergebnis;
  let index = 0;
  while (zahlen < wert) {
    array[index] = a;
    ergebnis = a + b;
    a = b;
    b = ergebnis;
    zahlen++;
    index++;
  }
  console.log(array);
}
