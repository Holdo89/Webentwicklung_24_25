//Part 1

// manipuliere den DOM, um Folgendes zu erreichen:
// Wähle das <p>-Element mit der ID "output" aus und ändere seinen Textinhalt auf "Text geändert!".
document.getElementById("output").innerText="Text ändern";
// Wähle das <h1>-Element innerhalb des <div> mit der ID "main-container" aus und ändere seinen Textinhalt auf "DOM-Manipulationsübung abgeschlossen!".
document.querySelector('h1').innerText="DOM-Manipulationsübung abgeschlossen!";
// Wähle das <button>-Element mit der ID "changeTextButton" aus und ändere seinen Textinhalt auf "Klick mich!„ und seine Hintergrundfarbe auf blau.
//let textButton=document.getElementById("changeTextButton").innerText="klick mich"
//textButton.style.backgroundColor="";
document.getElementById("changeTextButton").innerText="klick mich"
document.getElementsByTagName("button")[0].style.background="blue"
//Part 2

// Aktualisiere deine index.js-Datei, um die Ereignisbehandlung einzubeziehen:
// Füge dem main-container einen weiteren Button mit dem Text „Dark Mode“ nur unter Verwendung von Javascript hinzu
let buttons=document.createElement("button");
buttons.innerText="Darkmode";
let item=document.querySelector("div")
item.appendChild(buttons)

// Füge dem neuen Button einen Ereignis Listener hinzu. Wenn darauf geklickt wird, ändert sich 
// Hintergrundfarbe des <div> mit der ID "main-container" zu schwarz 
// und die Schrift darin wird weiß, 
// und der Text innerhalb des Buttons ändert sich zu „Light Mode“
function schwarz(){
    document.querySelector('div').style.backgroundColor="black"
    document.querySelector('div').style.color="white"
    document.querySelectorAll("button")[1].innerText="light Mode"
    
}
document.querySelectorAll("button")[1]
.addEventListener('click',schwarz)











// Wird der Button erneut geklickt dann ändert sich die Hintergrundfarbe wieder auf weiß und der Text des neuen Button zu „Dark Mode“


