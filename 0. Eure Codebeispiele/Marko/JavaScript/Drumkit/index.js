function mySound(event) {
  let sound = new Audio("sounds/" + event.key + ".mp3");
  sound.play();
}

document.addEventListener("keydown", function(event){
        mySound(event);
});

