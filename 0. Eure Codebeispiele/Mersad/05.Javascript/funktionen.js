function quart(a, b) {
  let ergebnis;
  if (b == undefined) {
    ergebnis = a ** a;
  } else {
    ergebnis = a ** b;
  }
  return ergebnis;
}

let hallo = quart(3, 2);
console.log(hallo);

// function quart(a, b = 2) --> dann brauch ich kein else

const beta = (a, b) => a ** b;
console.log(beta(3, 2));
