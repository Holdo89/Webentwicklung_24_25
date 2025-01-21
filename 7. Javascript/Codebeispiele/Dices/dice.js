const gameButton = document.getElementById("newGameButton");
const firstDice = document.querySelector(".img1");
const secondDice = document.querySelector(".img2");
const header = document.querySelector("h1");

function newGame(event) {
  event.stopPropagation();
  console.log(event);
  gameButton.style.backgroundColor = "green";
  let randomDice1 = Math.floor(Math.random() * 6) + 1;
  firstDice.setAttribute("src", `./images/dice${randomDice1}.png`);
  let randomDice2 = Math.floor(Math.random() * 6) + 1;
  secondDice.setAttribute("src", "./images/dice" + randomDice2 + ".png");

  if (randomDice1 > randomDice2) {
    header.innerText = "🚩 Player 1 wins";
  } else if (randomDice2 > randomDice1) {
    header.innerText = "Player 2 wins 🚩";
  } else {
    header.innerText = "Draw";
  }
}
document.addEventListener("keydown", function (event) {
  if (event.key === "n") {
    newGame();
  } else if (event.key === "r") {
    prompt("Reload the page");
  } else {
    console.log(event);
  }
});

document.addEventListener("click", function (event) {
  alert("Click anywhere to roll the dice");
});
gameButton.onclick = newGame;
