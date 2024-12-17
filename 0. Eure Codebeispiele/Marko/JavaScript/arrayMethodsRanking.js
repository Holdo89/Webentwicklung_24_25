const participants = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 80 },
    { name: 'Charlie', points: 95 },
    { name: 'David', points: 110 },
    { name: 'Eva', points: 60 }
  ];

//   Aufgaben:
// Verwende die forEach-Methode, um jeden Teilnehmer und seine Punktzahl auszugeben.
let listOfParticipants = participants.forEach((element) => 
  console.log("Teilnehmer: "+element.name +" | "+ "Punktanzahl: "+element.points));




// Verwende die map-Methode, um ein neues Array zu erstellen, das nur die Namen der Teilnehmer enthält.
let namesOfParticipants = participants.map((element) => console.log(element.name));


// Verwende die filter-Methode, um ein neues Array zu erstellen, das nur die Teilnehmer enthält, die mehr als 100 Punkte haben.
let pointsOfParticipants = participants.filter((element) => element.points > 100 );
console.log(pointsOfParticipants);

// Verwende die sort-Methode, um die Liste der Teilnehmer nach ihren Punktzahlen zu sortieren (aufsteigend).
let sortedParticipants = participants.sort((a, b) => a.points-b.points);
console.log(sortedParticipants);

// Verwende die reverse-Methode, um die Liste in absteigender Reihenfolge zu sortieren.
let reversedParticipants = sortedParticipants.reverse();
console.log(reversedParticipants);

// Gib die sortierte Rangliste aus, die sowohl den Namen als auch die Punktzahl jedes Teilnehmers enthält.
let sortedRangParticipants = sortedParticipants.forEach((element) => 
  console.log("Teilnehmer: "+element.name +" | "+ "Punktanzahl: "+element.points));
