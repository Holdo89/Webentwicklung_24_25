
// Example 1: Scoping within a block
{
    var varVariable = 'This is var';
    let letVariable = 'This is let';
}
console.log(varVariable); // accessible outside the block
// console.log(letVariable); // not accessible outside the block

//----------------------------------------------------------------------------

// Example 2: Redeclaration
var varVariable = 'Initial value';
let letVariable = 'Initial value';

// Redeclaring the variables
var varVariable = 'New value'; // No error
//let letVariable = 'New value'; // Error: SyntaxError: Identifier 'letVariable' has already been declared

//----------------------------------------------------------------------------


// Example 3: Hoisting
console.log(hoistedVar); // undefined
var hoistedVar = 'I am hoisted';

// console.log(hoistedLet); // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = 'I am not hoisted';

//----------------------------------------------------------------------------


// Example 4: Scope in a loop
// for (var i = 0; i < 3; i++) {
//     setTimeout(function() {
//         console.log('The value of i with var is: ' + i); // Prints 3 three times
//     }, 1000);
// }

// for (let j = 0; j < 3; j++) {
//     setTimeout(function() {
//         console.log('The value of j with let is: ' + j); // Prints 0, 1, 2
//     }, 1000);
// }



