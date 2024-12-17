function Schaltjahr(year) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 ==0 ) {
        return true;
    } else {
        return false;
    }

}
let year = 2024

if (Schaltjahr(year)) {
    console.log(year + " ist ein Schaltjahr.");
} else {
   console.log( year + " Ist kein SchaltJahr")
}


let würfelZahl = Math.ceil(Math.random()*6)+9 // 0,...,6
console.log(würfelZahl)



