//Lies vom Nutzer eine Temperatur ein, nutze ein if/else-if/else um auszugeben, ob es kalt, angenehm oder heiß ist.
let temperature = prompt("Enter a temperature:");
if (temperature >= 35) {
  alert("heiß");
} else if (temperature > 18 && temperature < 35) {
  alert("angenehm");
} else {
  alert("saukalt");
}

//Lies einen einzelnen Buchstaben ein und gib aus, ob es ein Vokal oder Konsonant ist. Nutze dafür ein switch-case mit default case und fall-through.
let oneCharInput = prompt("Enter any character:");

switch (oneCharInput) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u": {
    alert("vocal");
    break;
  }
  default: {
    alert("consonant");
    break;
  }
}

//Lese 3 Zahlen vom Benutzer ein, und gib die größte davon zurück. Nutze dabei Ternäre Ausdrücke. 
let number1 = prompt("first Number out of 3:");
let number2 = prompt("second Number out of 3:");
let number3 = prompt("third Number out of 3:");

number1 > number2 && number1 > number3
  ? alert("biggest number you entered is:" + number1)
  : number2 > number3
  ? alert("biggest number you entered is:" + number2)
  : alert("biggest number you entered is:" + number3);

  
//Lies eine Zahl vom Benutzer ein, und gebe aus, ob diese gerade, ungerade oder eine Kommazahl ist.
let numberInput = prompt("Enter a number:");

if (numberInput % 2 == 0) {
  alert("Even number");
} else if (numberInput % 2 == 1) {
  alert("Odd number");
} else {
  alert("decimal number");
}


