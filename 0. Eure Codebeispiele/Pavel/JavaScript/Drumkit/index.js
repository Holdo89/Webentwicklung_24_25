//Todo

document.addEventListener("keydown",function(event) {
let sound = new Audio("sounds/"+event.key+".mp3")
    sound.play()


})


function playSound(event){


let sound = new Audio("sounds/"+event.key+".mp3")
    sound.play()

}



