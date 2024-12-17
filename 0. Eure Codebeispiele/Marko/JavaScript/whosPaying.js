let names = ["Mersad", "Pavel", "Hasan", "Thomas"];

let name = whosPaying(names);
console.log(name + " zahlt die Rechnung");

function whosPaying(names) {
  let randomnumber = Math.floor(Math.random()*4);
  return names[randomnumber];
}


