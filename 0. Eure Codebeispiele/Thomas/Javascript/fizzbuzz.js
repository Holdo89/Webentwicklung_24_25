// Gib alle Zahlen von 1 – 100 aus, jedoch werden 
// Zahlen die durch 3 teilbar sind durch das Wort „Fizz“ ersetzt, 
// Zahlen die durch 5 teilbar sind werden durch „Buzz“ ersetzt und 
// Zahlen die durch 3 und 5 teilbar sind werden durch „FizzBuzz“ ersetzt.
// Nutze dafür eine while loop!
// Beispiel Output: 1,2,Fizz, 4,Buzz,Fizz,7,8,….

/*let i=1;
while(i<100){
    if(i %5===0 && i %3===0){
        console.log("FizzBuzz")
        i=i+1;
    }
    else if(i %5===0){
        console.log("Buzz")
        i=i+1;
    }
    else if(i %3===0){
        console.log("Fizz")
        i=i+1;
    }
    else{
        console.log(i)
        i=i+1;
    }
}
*/
/*let Zahl=99;
for(let i=Zahl; i>0; i--){
    if(Zahl >1)
    console.log (Zahl+ "Bottles of Beer on the wall"+Zahl +"Bottles of Beer")
    Zahl--;
    console.log("Take one down and pass it around"+Zahl+"Bottles of beer on the wall") 
    console.log("\n")
}*/


function generateFibonacci(a){
    counter=0;
    let i=0;
    let j=1;
    let array=[];
    while(counter<a){
        let ergebniss=i+j;
        array.push(i);
        j=i;
        i=ergebniss;
        counter++;
    }
    console.log(array)
}

generateFibonacci(10)










        
