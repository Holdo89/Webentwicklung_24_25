let fruit = "Bananens";

// switch(fruit) {
//   case 'Apfel':
//     console.log('Äpfel sind rot.');
//     break;
//   case 'Banane':
//     console.log('Bananen sind gelb.');
//     break;
//   case 'Orange':
//     console.log('Orangen sind orange.');
//     break;
//   default:
//     console.log('Ich kenne diese Frucht nicht.');
//     break;
// }

let message =
  fruit === "Apfel"
    ? "Äpfel sind rot"
    : fruit === "Banane"
    ? "Bananen sind gelb"
    : "Ich kenne diese Frucht nicht";
console.log(message);
