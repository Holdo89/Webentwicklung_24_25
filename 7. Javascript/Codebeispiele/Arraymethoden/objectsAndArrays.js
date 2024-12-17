// 1. Wochentage-Array und Nutzereingabe
const wochentage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

const eingabe = parseInt(prompt("Gib eine Zahl zwischen 1 und 7 ein:"));
if (eingabe >= 1 && eingabe <= 7) {
  console.log(`Der gewählte Wochentag ist: ${wochentage[eingabe - 1]}`);
} else {
  console.log("Ungültige Eingabe! Bitte gib eine Zahl zwischen 1 und 7 ein.");
}

// 2. Objekt für ein Fahrzeug mit verschiedenen Datentypen
const lieblingsFahrzeug = {
  typ: "Auto",
  marke: "BMW",
  modell: "M3",
  baujahr: 2022,
  farbe: "Blau",
  elektrisch: false,
  ps: 510,
};

console.log(`\nMein Lieblingsfahrzeug:
Typ: ${lieblingsFahrzeug.typ}
Marke: ${lieblingsFahrzeug.marke}
Modell: ${lieblingsFahrzeug.modell}
Baujahr: ${lieblingsFahrzeug.baujahr}
Farbe: ${lieblingsFahrzeug.farbe}
Elektrisch: ${lieblingsFahrzeug.elektrisch ? "Ja" : "Nein"}
Leistung: ${lieblingsFahrzeug.ps} PS`);

// 3. Zweidimensionales Array für die Tabelle
const tabelle = [
  ["Hans", "Müller", 22],
  ["Georg", "Huber", 37],
  ["Fritz", "Mayr", 19],
];

const zeile = parseInt(prompt("\nGib die Zeilennummer (0-2) ein:"));
const spalte = parseInt(prompt("Gib die Spaltennummer (0-2) ein:"));
if (zeile >= 0 && zeile < tabelle.length && spalte >= 0 && spalte < tabelle[0].length) {
  console.log(`Der gewünschte Wert ist: ${tabelle[zeile][spalte]}`);
} else {
  console.log("Ungültige Eingabe! Überprüfe Zeilen- und Spaltennummer.");
}

// 4. Tabelle als Array von Objekten
const tabelleObjekte = [
  { Vorname: "Hans", Nachname: "Müller", Alter: 22 },
  { Vorname: "Georg", Nachname: "Huber", Alter: 37 },
  { Vorname: "Fritz", Nachname: "Mayr", Alter: 19 },
];

const zeilenNummer = parseInt(prompt("\nGib die Zeilennummer (0-2) ein:"));
const spaltenName = prompt("Gib den Namen der Spalte (Vorname, Nachname, Alter) ein:");
if (
  zeilenNummer >= 0 &&
  zeilenNummer < tabelleObjekte.length &&
  spaltenName in tabelleObjekte[zeilenNummer]
) {
  console.log(`Der gewünschte Wert ist: ${tabelleObjekte[zeilenNummer][spaltenName]}`);
} else {
  console.log("Ungültige Eingabe! Überprüfe Zeilennummer oder Spaltennamen.");
}
