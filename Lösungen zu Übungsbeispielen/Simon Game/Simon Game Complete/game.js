var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keypress", function(event) {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

var buttons = document.querySelectorAll(".btn");
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    var userChosenColour = button.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    document.body.classList.add("game-over");
    setTimeout(function() {
      document.body.classList.remove("game-over");
    }, 200);

    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";
    gameOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern)
  animatePress(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var currentElement = document.getElementById(currentColor);
  playSound(currentColor);
  currentElement.classList.add("pressed");
  setTimeout(function() {
    currentElement.classList.remove("pressed");
  }, 500);
}

function gameOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
