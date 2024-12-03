/*function pow(a, b) {
  if ((a, b)) {
    console.log(a ** b);
  } else {
    console.log(a ** 2);
  }
}
pow(4);


function pow(a,b=2){
    console.log(a**b);
}

pow(2,8);*/

const addArrow = (a, b = 2) => a ** b;

console.log(addArrow(2, 8));
