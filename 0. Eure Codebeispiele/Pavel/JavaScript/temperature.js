/*function test (a, b ){
//  console.log(a + b)
    return(a + b )

}

let stringvar = test('Hallo ', 'Codersbay');  
console.log(stringvar);



function pow(basis, exponent = 2) {
  
  return basis ** exponent;
}

console.log(pow(3));
console.log(pow(3,3));
console.log(pow(2,5));


function pow1(c, d) {
  if (c != null  && d != null) { 
    return c ** d; 
  } else if (c != null  && d == null ) { 
    return c ** 2; 
  } else {
    return ""; 
  }
}


console.log(pow1(3, 3)); 
console.log(pow1(4));   
console.log(pow1());     

*/
function pow2 (a = null, b = null){
return a ** b
}

const pow2Arrow = (a = null, b = null) => a ** b;

console.log(pow2(2,2));
console.log (pow2Arrow(3,3));
console.log(pow2(2,2));           
console.log(pow2Arrow())

