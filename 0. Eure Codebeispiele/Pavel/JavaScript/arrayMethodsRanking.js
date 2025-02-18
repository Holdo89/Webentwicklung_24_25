const participants = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 80 },
    { name: 'Charlie', points: 95 },
    { name: 'David', points: 110 },
    { name: 'Eva', points: 60 }
  ];

//   Aufgaben:
// Verwende die forEach-Methode, um jeden Teilnehmer und seine Punktzahl auszugeben.
participants.forEach(function(participant) {
  console.log(participant.name + " hat " + participant.points + " Punkte.");
});

// Verwende die map-Methode, um ein neues Array zu erstellen, das nur die Namen der Teilnehmer enthält.
const names = participants.map(function(participant){
  return participant.name ;
});
//const names = praticipants.map(participant => participant.name);
console.log(names);

// Verwende die filter-Methode, um ein neues Array zu erstellen, das nur die Teilnehmer enthält, die mehr als 100 Punkte haben.

const highScorers = participants.filter(function(participant) {
  return participant.points > 100;
});

highScorers.forEach(function(participant) {
  console.log(participant.name + " hat " + participant.points + " Punkte.");
});

// Verwende die sort-Methode, um die Liste der Teilnehmer nach ihren Punktzahlen zu sortieren (aufsteigend).
participants.sort(function(a, b) {
  return a.points - b.points;
});

participants.forEach(function(participant) {
  console.log(participant.name + " hat " + participant.points + " Punkte.");
});
// Verwende die reverse-Methode, um die Liste in absteigender Reihenfolge zu sortieren.
participants.sort(function(a, b) {
  return a.points - b.points;
});
participants.reverse();
participants.forEach(function(participant) {
  console.log(participant.name + " hat " + participant.points + " Punkte.");
});
// Gib die sortierte Rangliste aus, die sowohl den Namen als auch die Punktzahl jedes Teilnehmers enthält.
participants.sort(function(a, b) {
  return b.points - a.points; 
});
console.log("Rangliste: ");
participants.forEach(function(participant, index) {
  console.log((index + 1) + " " + participant.name + " hat " + participant.points + " Punkte");
});

