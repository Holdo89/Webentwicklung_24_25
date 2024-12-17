let n = 2;
n*10;
document.write(n**n);

let temperatur = prompt("bitte gib eine temperatur ein")
if(temperatur <= 30){
    console.log('Heute ist nicht heiß!!')
}else if(temperatur > 30){
    console.log('Heute ist so heiß!!')
}else{
    console.log('ungültige eingabe,')
}

/*****************************/
let buchstabe = prompt("bitte gib eine buchstabe ein")

switch(buchstabe){
    case 'a':
    case 'i':
    case 'o':
    case 'u':
    case 'e':
        console.log('ist Vokal')
        break;
    default:
        console.log('ist Konsonant')
}
/***********************************/
let num1 = prompt("bitte gib Zahl 1 :")
let num2 = prompt("bitte gib Zahl 1 :")
let num3 = prompt("bitte gib Zahl 1 :")
let max = num1;
if(max < num2){
    max = num2
}
if(max < num3){
    max = num3
}else{
    max
}
alert(max)
/*********************************/
let num = prompt("bitte gib Zahl 1 :")
if(num % 2 == 0){
    console.log('ist gerade Zahl')
}else if(num %2 == 1){
    console.log('ist nicht gerade Zahl')
}else{
    console.log('ist eine Kommazahl')
}
/****************************************/

let name = prompt("Bitte Name eingeben:");
let newNamelower = name.toLowerCase();
let newNameSpace = name.lastIndexOf(" ");
let vorname = name[0].toUpperCase()+newNamelower.slice(1,newNameSpace);
let lastname = ' '+name[newNameSpace+1].toUpperCase() + newNamelower.slice(newNameSpace+2) ;
alert (vorname + lastname);
/*****************************************/

function pow(a, b){
    if (a != null && b != null){
        return a**b;
    }else if ( a != null && b == null){
        return a**2;  
    }else{
        console.log ('Sorry')
    }    
}

function pow1 (a,b = 2){
    return a**b
}

pow()
pow1(2,2)
const s = (a , b = 2) => a**b 

console.log(s(5))
/*************************************************/

function isleap (j){
    const s = j % 400;
    s == 0 ?  console.log('JA') : console.log('NEIN');
}
isleap(100)

/****************************************************/

const rndInt = Math.ceil(Math.random() * 6)
console.log(rndInt)

/****************************************************/
function ran(array){
    let ar = Math.ceil(Math.random()*(array.length)-1)
    return array[ar]
}
  
const arrays = ["Ayham","Pavel","Mersad","Hassan","Marko","Thomas"]
console.log(ran(arrays))