let Gewicht=70;
let Größe=1.77;
let bmi=Gewicht/Größe*Größe;

function berechneBmi(Gewicht,Größe){
    let bmi=Gewicht/Größe*Größe;
if (bmi <18.5){
    return "Untergewicht";
}else if(bmi >=18.5 && bmi < 24.9){
    return "Normal";
}
else if(bmi >=25 && bmi <29.9){
    return "Übergewicht";
}else if(bmi >=30 && bmi <=34.9){
    return "Obese";
}else{
    return "ExtremObese";
}
}
berechneBmi(70,1.77);
function getbmi(Größe,Gewicht){
    bmi=gewicht/(Größe*Größe)
    return bmi;
}

let randomNumber =math.floor(math.random()*5+1);
console.log(randomNumber);

let max=5;
let min=1;
let randomNumber1=math.random()*(max-min)+min





