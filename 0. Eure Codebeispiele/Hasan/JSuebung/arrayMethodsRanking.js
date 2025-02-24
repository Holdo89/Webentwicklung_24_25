const participants = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 80 },
    { name: 'Charlie', points: 95 },
    { name: 'David', points: 110 },
    { name: 'Eva', points: 60 }
  ];

//   Aufgaben:
// Verwende die forEach-Methode, um jeden Teilnehmer und seine Punktzahl auszugeben.
console.log("Teilnehmer und Punktzahlen:");
participants.forEach(participant => {
  console.log(`${participant.name}: ${participant.points} Punkte`);
});

// Verwende die map-Methode, um ein neues Array zu erstellen, das nur die Namen der Teilnehmer enthält.
const names = participants.map(participant => participant.name);
  console.log("\nNamen der Teilnehmer:", names);

// Verwende die filter-Methode, um ein neues Array zu erstellen, das nur die Teilnehmer enthält, die mehr als 100 Punkte haben.
const highScorers = participants.filter(participant => participant.points > 100);
  console.log("\nTeilnehmer mit mehr als 100 Punkten:", highScorers);

// Verwende die sort-Methode, um die Liste der Teilnehmer nach ihren Punktzahlen zu sortieren (aufsteigend).
const sortedAscending = [...participants].sort((a, b) => a.points - b.points);
console.log("\nNach Punkten aufsteigend sortiert:", sortedAscending);

// Verwende die reverse-Methode, um die Liste in absteigender Reihenfolge zu sortieren.
const sortedDescending = [...sortedAscending].reverse();
  console.log("\nNach Punkten absteigend sortiert (Rangliste):");
  sortedDescending.forEach((participant, index) => {
    console.log(`#${index + 1} ${participant.name}: ${participant.points} Punkte`);
  });
  
// Gib die sortierte Rangliste aus, die sowohl den Namen als auch die Punktzahl jedes Teilnehmers enthält. 