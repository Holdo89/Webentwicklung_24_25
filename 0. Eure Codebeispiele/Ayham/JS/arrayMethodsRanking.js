const participants = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 80 },
    { name: 'Charlie', points: 95 },
    { name: 'David', points: 110 },
    { name: 'Eva', points: 60 }
  ];

//   Aufgaben:
// Verwende die forEach-Methode, um jeden Teilnehmer und seine Punktzahl auszugeben.
participants.forEach(teil)
function teil(teilnehmer){
  console.log(`${teilnehmer.name}: ${teilnehmer.points} Punkte`)
}
console.log('========================')

// Verwende die map-Methode, um ein neues Array zu erstellen, das nur die Namen der Teilnehmer enthält.
const names = participants.map((teilnehmer)=> teilnehmer.name) 
console.log(names)

console.log('========================')
// Verwende die filter-Methode, um ein neues Array zu erstellen, das nur die Teilnehmer enthält, die mehr als 100 Punkte haben.
const teilnehmerMitMehrAls100Points = participants.filter((teilnehmer) => teilnehmer.points > 100)
teilnehmerMitMehrAls100Points.forEach((point) => console.log(point.name))

console.log('========================')
// Verwende die sort-Methode, um die Liste der Teilnehmer nach ihren Punktzahlen zu sortieren (aufsteigend).
const sortedAscending = [...participants].sort((a, b) => a.points - b.points);
sortedAscending.forEach((point) => console.log(point.name));

console.log('========================')
// Verwende die reverse-Methode, um die Liste in absteigender Reihenfolge zu sortieren.
const sortedDescending = [...sortedAscending].reverse();
  sortedDescending.forEach((participant, index) => {
  console.log(`#${index + 1} ${participant.name}: ${participant.points} Punkte`);
  });

console.log('========================')
// Gib die sortierte Rangliste aus, die sowohl den Namen als auch die Punktzahl jedes Teilnehmers enthält.
console.log("Rangliste:");
const sortedDescending2 = [...sortedAscending];
sortedAscending.forEach((participant2, index) => {
  console.log(`#${index + 1} ${participant2.name}: ${participant2.points} Punkte`);
  });
  