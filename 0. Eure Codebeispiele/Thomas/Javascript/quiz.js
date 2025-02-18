let numberToGuess=Math.round(Math.random()*10);
let tries=0;

function getTheNumber(){
    tries=tries+1;
    displayTries.innerHTML="Versuche:"+tries;


    if(numberToGuess===mynumber){
    Headline.innerHTML="Du hast gewonnen";
    }

}