document.addEventListener("keydown", function (event) {
  playSound(sound);

  //  if (event.key === "w") {
  //    let sound = new Audio("sounds/" + event.key + ".mp3");
  //    sound.play();
  //  } else if (event.key === "a") {
  //    let sound = new Audio("sounds/" + event.key + ".mp3");
  //    sound.play();
  //  } else if (event.key === "s") {
  //    let sound = new Audio("sounds/" + event.key + ".mp3");
  //    sound.play();
  //  } else if (event.key === "d") {
  //    let sound = new Audio("sounds/" + event.key + ".mp3");
  //    sound.play();
  //  } else if (event.key === "j") {
  //    let sound = new Audio("sounds/" + event.key + ".mp3");
  //    sound.play();
  //  } else if (event.key === "k") {
  //    let sound = new Audio("sounds/" + event.key + ".mp3");
  //    sound.play();
  //  } else if (event.key === "l") {
  //    let sound = new Audio("sounds/" + event.key + ".mp3");
  //    sound.play();
  //  }
});

function playSound(sound) {
  let Sound = new Audio("sounds/" + sound.key + ".mp3");
  Sound.play();
}
