function pow (a, b) {
    if ((a, b)) {
        console.log(a ** b);

    } else {
        console.log(a ** 2);
    }
}
pow(4);

function pow(a, b = 2){
    console.log(a ** b)
}
pow(3,4);
pow(3);
