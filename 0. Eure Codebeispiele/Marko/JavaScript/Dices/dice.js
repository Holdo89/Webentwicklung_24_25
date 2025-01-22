const gameButton = document.getElementById("newGameButton")
const randomDice1 = document.querySelector(".img1")


function newGame(){
    gameButton.style.backgroundColor="green"
    let player1 = Math.floor(Math.random()*6)+1
     
}

gameButton.onclick= newGame