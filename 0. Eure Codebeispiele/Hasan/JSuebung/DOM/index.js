//Part 1

// manipuliere den DOM, um Folgendes zu erreichen:
// Wähle das <p>-Element mit der ID "output" aus und ändere seinen Textinhalt auf "Text geändert!".
// Wähle das <h1>-Element innerhalb des <div> mit der ID "main-container" aus und ändere seinen Textinhalt auf "DOM-Manipulationsübung abgeschlossen!".
// Wähle das <button>-Element mit der ID "changeTextButton" aus und ändere seinen Textinhalt auf "Klick mich!„ und seine Hintergrundfarbe auf blau.

//Part 2

// Aktualisiere deine index.js-Datei, um die Ereignisbehandlung einzubeziehen:
// Füge dem main-container einen weiteren Button mit dem Text „Dark Mode“ nur unter Verwendung von Javascript hinzu
// Füge dem neuen Button einen Ereignis Listener hinzu. Wenn darauf geklickt wird, ändert sich 
// Hintergrundfarbe des <div> mit der ID "main-container" zu schwarz 
// und die Schrift darin wird weiß, 
// und der Text innerhalb des Buttons ändert sich zu „Light Mode“
// Wird der Button erneut geklickt dann ändert sich die Hintergrundfarbe wieder auf weiß und der Text des neuen Button zu „Dark Mode“

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