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

// nicht vollständig --> Fehler !!!

let jahr = 1900;

let ergebnis = vier(hundert);

if (ergebnis) {
  console.log(ergebnis + " ist ein Schaltjahr");
} else {
  console.log(ergebnis + " ist kein schaltjahr");
}

function vierHundert(hundert) {
  let jahr = 1900;
  if (jahr % 400 == 0) {
    return true;
  }
  hundert();
}
function hundert(vier) {
  if (jahr % 100 == 0) {
    return false;
  }
  vier();
}
function vier() {
  if (jahr % 4 == 0) {
    return true;
  }
  return false;
}

// ChatGBT

function istSchaltjahr(jahr) {
  function pruefe400(jahr) {
    if (jahr % 400 === 0) {
      return true; // Durch 400 teilbar => Schaltjahr
    }
    return pruefe100();
  }

  function pruefe100() {
    if (jahr % 100 === 0) {
      return false; // Durch 100 teilbar, aber nicht durch 400 => Kein Schaltjahr
    }
    return pruefe4();
  }

  function pruefe4() {
    if (jahr % 4 === 0) {
      return true; // Durch 4 teilbar, aber nicht durch 100 => Schaltjahr
    }
    return false; // Nicht durch 4 teilbar => Kein Schaltjahr
  }

  return pruefe400();
}

// Hauptprogramm
if (istSchaltjahr(jahr)) {
  console.log(jahr + " ist ein Schaltjahr");
} else {
  console.log(jahr + " ist kein Schaltjahr");
}

let würfelZahl = Math.ceil(Math.random() * 6);
console.log(würfelZahl);
