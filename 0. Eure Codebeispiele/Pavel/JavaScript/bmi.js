function bmi(weight, height) {
    let bmical = weight / (height ** 2);

    if (bmical <= 18.5) {
        return "Your BMI is " + bmical + " Underweight";
    } else if (bmical >= 18.5 && bmical <= 24.9) {
        return "Your BMI is " + bmical + " Normal";
    } else if (bmical >= 25  && bmical <= 29.9) {
        return "Your BMI is " + bmical + " Overweight";
    } else if (bmical >= 30 && bmical <= 34.9) {
        return "Your BMI is " + bmical + " Obese";
    } else if (bmical >= 35 )  {
        return "Your BMI is " + bmical + " Extremely Obese";
    }
}

console.log(bmi(75, 1.77));