fetch("http://localhost:3000/jokes/50", {
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