// Gib alle Zahlen von 1 – 100 aus, jedoch werden 
// Zahlen die durch 3 teilbar sind durch das Wort „Fizz“ ersetzt, 
// Zahlen die durch 5 teilbar sind werden durch „Buzz“ ersetzt und 
// Zahlen die durch 3 und 5 teilbar sind werden durch „FizzBuzz“ ersetzt.
// Nutze dafür eine while loop!
// Beispiel Output: 1,2,Fizz, 4,Buzz,Fizz,7,8,….


let x = 100;
while (x > 0){
    if(x % 3 == 0 && x % 5 == 0)
        console.log('„FizzBuzz“')
    else if(x % 5 == 0)
        console.log('„Buzz“')
    else if(x % 3 == 0)
        console.log('„Fizz“')
    else
        console.log(x)
    x--;
}



