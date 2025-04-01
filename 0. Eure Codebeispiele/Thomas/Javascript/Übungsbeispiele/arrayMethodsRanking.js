const participants = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 80 },
    { name: 'Charlie', points: 95 },
    { name: 'David', points: 110 },
    { name: 'Eva', points: 60 }
  ];

//   Aufgaben:
// Verwende die forEach-Methode, um jeden Teilnehmer und seine Punktzahl auszugeben.
participants.forEach(function (Personen){
      console.log("Name "+Personen.name+ " Points "+Personen.points)
});
/*for(let i=0; i<participants.length; i++){
  console.log(participants[i].name+ " hat "+ participants[i].points)
}*/

// Verwende die map-Methode, um ein neues Array zu erstellen, das nur die Namen der Teilnehmer enthält.
let Namen=participants.map(Personen=>Personen.name)
console.log(Namen)
// Verwende die filter-Methode, um ein neues Array zu erstellen, das nur die Teilnehmer enthält, die mehr als 100 Punkte haben.
const guteTeilnehmer=participants.filter(Personen =>Personen.points>=100)
console.log(guteTeilnehmer)
// Verwende die sort-Methode, um die Liste der Teilnehmer nach ihren Punktzahlen zu sortieren (aufsteigend).
let sortierteTeilnehmr=participants.sort((a,b)=>a.points-b.points)
console.log(sortierteTeilnehmr)
// Verwende die reverse-Methode, um die Liste in absteigender Reihenfolge zu sortieren.
let reverse=participants.reverse(sortierteTeilnehmr)
console.log(reverse)
// Gib die sortierte Rangliste aus, die sowohl den Namen als auch die Punktzahl jedes Teilnehmers enthält.
reverse.forEach((participants)=>{
  console.log(participants.name + " " + "hat" + " " +participants.points)
});

