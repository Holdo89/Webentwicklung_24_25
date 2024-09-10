// // Iteriert über jedes Element im Array und führt eine bereitgestellte Funktion aus.
// const arrayForEach = [1, 2, 3, 4, 5];
 //arrayForEach.forEach((element,index, array) => console.log("An Stelle ", index , "steht", element, "des Arrays ", array));

//selbes Beispiel nur mit einer externen Funktion
// arrayForEach.forEach(myFunction)
// function myFunction(elxyz,index,array){
//     console.log("An Stelle ", index , "steht", elxyz, "des Arrays ", array)
// }

// // Erstellt ein neues Array, indem eine bereitgestellte Funktion auf jedes Element im Array angewendet wird.
// const arrayMap = [1, 2, 3, 4, 5];
// const newArrayMap = arrayMap.map((element) => element * 2);
// console.log(newArrayMap);

// // Überprüft, ob mindestens ein Element im Array eine bestimmte Bedingung erfüllt.
// const arraySome = [1, 2, 3, 4, 5];
// const someResult = arraySome.some(element => element > 2);
// console.log(someResult);

// // Überprüft, ob alle Elemente im Array eine bestimmte Bedingung erfüllen.
// const arrayEvery = [1, 2, 3, 4, 5];
// const everyResult = arrayEvery.every(element => element > 2);
// console.log(everyResult);

// // Filtert Elemente basierend auf einer bestimmten Bedingung und erstellt ein neues Array.
// const arrayFilter = [1, 2, 3, 4, 5];
// const filteredArray = arrayFilter.filter(element => element % 2 === 0);
// console.log(filteredArray);

// // Reduziert das Array auf einen einzelnen Wert durch Anwendung einer akkumulierten Funktion auf jedes Element.
// // Als Parameter werden (total, value, index, array) mitgegeben
// const arrayReduce = [1, 2, 3, 4, 5];
// const resultReduce = arrayReduce.reduce((sum, currentValue) => sum + currentValue, 0);
// console.log(resultReduce);

//Gibt den Index des ersten Vorkommens eines Elements im Array zurück.
// const arrayIndexOf = [1, 2, 3, 4, 5];
// const index = arrayIndexOf.indexOf(3);
// console.log(index);

//Gibt das erste Element im Array zurück, das eine bestimmte Bedingung erfüllt.
// const arrayFind = [10, 20, 30, 40, 50];
// const foundElement = arrayFind.find(element => element > 25);
// console.log(foundElement);

// // Gibt ein neues Array mit den Schlüssel-Wert-Paaren des Arrays zurück.
// const arrayEntries = [1, 2, 3, 4, 5];
// const entries = arrayEntries.entries();
// console.log(Array.from(entries));

// // Durchläuft das Array und gibt ein neues Array mit den Schlüsseln (Indizes) zurück.
// const arrayKeys = [1, 2, 3, 4, 5];
// const keys = arrayKeys.keys();
// console.log(Array.from(keys));
