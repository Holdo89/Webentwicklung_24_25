function pow (a, b) {
    if ((a, b)) {
        console.log(a ** b);

    } else {
        console.log(a ** 2);
    }
}
pow(4);

//ohne if-else

function pow(a, b = 2){
    console.log(a ** b)
}
pow(3,4);
pow(3);

//addArrow

const addArrow = (a, b = 2) => a ** b;
console.log(addArrow(2, 8));