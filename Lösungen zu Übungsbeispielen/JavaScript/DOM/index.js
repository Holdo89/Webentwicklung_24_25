document.getElementById("output").innerHTML="Juhuu"

document.querySelector("#main-container h1").innerHTML = "test"
document.getElementsByTagName("button")[0].innerHTML="klick mich"
document.getElementsByTagName("button")[0].style.backgroundColor = "blue"

let newButton = document.createElement("button")
newButton.innerHTML = "Dark Mode"
newButton.addEventListener("click", changeMood)

function changeMood(){
    if(document.getElementById("main-container").style.backgroundColor==="white")
    {
        document.getElementById("main-container").style.backgroundColor="black"
        document.getElementById("main-container").style.color="white"
        document.getElementsByTagName("button")[1].innerHTML="Light Mode"
    }
    else{
        document.getElementById("main-container").style.backgroundColor="white"
        document.getElementById("main-container").style.color="black"
        document.getElementsByTagName("button")[1].innerHTML="Dark Mode"
    }
}

document.getElementById("main-container").append(newButton)