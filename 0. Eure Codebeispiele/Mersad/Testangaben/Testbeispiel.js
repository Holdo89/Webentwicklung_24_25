let a = 2;
let b = 3;

addNumbers(a, b);

function addNumbers(a, b) {
  let sum = a + b;
  console.log(sum);
}

const button = document.getElementById("code");

button.addEventListener("click", function () {
  let inputField = document.querySelector("input");
  let value = inputField.value;
  console.log("Wert*2 = " + value * 2);
});
