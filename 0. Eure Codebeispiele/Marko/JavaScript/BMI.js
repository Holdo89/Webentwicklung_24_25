function bodyMassIndex(weight, height){
    let bmi = weight/(height**2);
    if (bmi<18.5){
        console.log('Your BMI is Underweight');
    } if (bmi>=18.5 && bmi<=24.9){
        console.log('Your BMI is Normal');
    } if (bmi>=25 && bmi<=29.9){
        console.log('Your BMI is Overweight');
    } if (bmi>=30 && bmi<=34.9){
        console.log('Your BMI is Obese');
    } if (bmi>=35){
        console.log('Your BMI is Extremly Obese');
    }
    console.log(bmi);

}

let myBmi = bodyMassIndex (70, 1.7);