function isLeapYear(year) {
  if (
    (year % 4 == 0 && year % 100 != 0) ||
    (year % 100 == 0 && year % 400 == 0)
  ) {
    console.log("Das ist ein Schaltjahr!");
  } else {
    console.log("Das ist KEIN Scahltjahr!");
  }
}

isLeapYear(2023);
