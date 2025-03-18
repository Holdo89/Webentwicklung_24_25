// andere Variante
//document.getElementById("demo").innerHTML = "Hello World!";

let htmlElement = document.getElementById("demo");

fetch("http://localhost:3000/jokes/101", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // andere Variante
    //document.getElementById("demo").innerHTML = data.jokeText;
    htmlElement.innerHTML = data.jokeText;
    htmlElement.style.backgroundColor = "red";
  });

fetch("http://localhost:3000/jokes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: 101, jokeText: "witzig", jokeType: "codersbay" }),
});