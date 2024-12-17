function isLeapYear(year) {
    if (year % 4 == 0 && year % 100 != 0 || year % 100 == 0 && year % 400 == 0) {
        console.log("Schaltjahr!");

    } else {
        console.log("Kein Schaltjahr!");
    }
}
isLeapYear(2024);