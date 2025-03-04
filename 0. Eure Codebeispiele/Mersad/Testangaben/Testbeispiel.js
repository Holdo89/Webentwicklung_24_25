let a = 2;
let b = 3;

addNumbers(a, b);

function addNumbers(a, b) {
  let sum = a + b;
  console.log(sum);
}

const button = document.getElementById("code");

button.addEventListener("click", ergebnis);

function ergebnis() {
  let sum = 0;
  sum = sum * 2;

  console.log(sum);
}
