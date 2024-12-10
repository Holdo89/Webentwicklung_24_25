let groesse = 1.70;
let gewicht = 75;

let bmi = getBmi (groesse, gewicht);

if (bmi < 18.5) {
    console.log("Untergewichtig");
} else if (bmi < 18.5-24.9) {
    console.log("Normal");
} else if (bmi < 25-29.9) {
    console.log("Übergewichtig");
} else if (bmi < 30-34.9) {
    console.log("Fett");
} else {
    console.log("Extrem Fett")
}


function getBmi (groesse, gewicht) {
    bmi = gewicht / (groesse ** 2);
    console.log(ergebnis)
}