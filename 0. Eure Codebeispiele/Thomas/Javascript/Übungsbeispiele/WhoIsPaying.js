
    

/*const names=["Max","Jen","Thomas","Benni","jennifer"]

function whoIsPaying(names){
    let randomNumber=Math.floor(Math.random()*names.length);
    return (names[randomNumber]);
}

console.log(whoIsPaying(names)+ " muss heute das Essen bezahlen")*/

const { reverse } = require("dns");

/*const { forEach } = require("async");

const participants=[
    {name:"Elise" ,points:100},
    {name:"Bob", points:80},
    {name:"Charlie",points:95},
    {name:"David",points:110},
    {name:"Eva",points:60}
];

participants.forEach(function(person){
    console.log(person.name +" hat " +person.points + " Punkte")
})
participants[0].name="Max";
console.table(participants)

/*for(let i =0; i<participants.length;i++){
    console.log(participants[i].name +" hat" +participants[i].points+" Punkte")
}

/*const teilnehmer=participants.map(function(person){
    return person.name
});
console.log(teilnehmer)

const guteTeilnehmer=participants.filter(function(person){
     return person.points >=100;
    
});
console.table(guteTeilnehmer);

let sortierteTeilnehmer=participants.sort(function (a,b) {
    return b.points-a.points;
});
console.table(sortierteTeilnehmer);


/*function teilnehmer1(a,b){
    return b.points-a.points;
}
    
let sehrGute=participants.sort(teilnehmer1);
console.table(sehrGute);

/*let absteigend=participants.reverse(teilnehmer1);
console.table(absteigend)*/

let wochentage=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"]

function getWochentage(){
    let zahl =Math.floor(Math.random()*7);

if(zahl >=0 && zahl <= 6){
    console.log("Der Wochentag ist " +wochentage[zahl])

}else{
    console.log("Ungülitge Zahl")
}
}
getWochentage();

const names=['yo','tt','qq','rr']
function whoisit(names){
    let random=Math.floor(Math.random()*names.length)
    return(names[random])
}
console.log(whoisit(names) + 'muss heute das essen bezahlen')




