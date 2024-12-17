whosPaying()

function whosPaying () {
    let max = 5;
    let min = 0;
    let randomNum = Math.floor ( Math.random() * (max - min) + min) // 5 ist max und 0 ist min 
    const names = ["Hasan", "Mersad", "Marko", "Thomas", "Ayham", "Pavel", "Dominic"];
    console.log(names [randomNum] + " bezahlt die Rechnung");
}