let groeße = 1.78;
let gewicht = 75;

let bmi = getBmi(groeße, gewicht);

if (bmi < 18.5) {
  console.log("underweight");
} else if (bmi > 18.5 && bmi < 24.9) {
  console.log("normal");
} else if (bmi > 25 && bmi < 29.9) {
  console.log("overweight");
} else if (bmi > 30 && bmi < 34.5) {
  console.log("obese");
} else {
  console.log("extremely obese");
}

function getBmi(groeße, gewicht) {
  bmi = gewicht / (groeße * groeße);
  return bmi;
}
