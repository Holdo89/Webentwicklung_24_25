let weight = 70;
let height = 1.70;


if (bmi<18.5){
    console.log('Your BMI is Underweight');
} else if (bmi>=18.5 && bmi<=24.9){
    console.log('Your BMI is Normal');
} else if  (bmi>=25 && bmi<=29.9){
    console.log('Your BMI is Overweight');
} else if  (bmi>=30 && bmi<=34.9){
    console.log('Your BMI is Obese');
} else if (bmi>=35){
    console.log('Your BMI is Extremly Obese');
}
bmi(weight, height);
console.log(bmi);

function bmi(weight, height){
    let bmindex = weight/(height**2);
    return bmindex;
}

