 document.getElementById("demo").innerHTML = "Hello World";

 fetch("http://localhost:3000/jokes/50", {
    method: "GET",
    headers:{
        "Content-Type": "application/json"
    }
 }).then((response) => response.json())
 .then((data) => {
    htmlElement.innerHTML = data.jokeText;
    htmlElement.style.backgroundcolor ="red";
 })