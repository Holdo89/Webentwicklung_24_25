document.getElementById("demo").innerHTML = "Hello BAY";

fetch("http://localhost:8090/jokes/103", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("demo").innerHTML = data.jokeText;
  });

fetch("http://localhost:8090/postjoke", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: 102,
    jokeText: "MAC&Cheese",
    jokeType: "Mama",
  }),
});
fetch("http://localhost:8090/postjoke", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: 103,
    jokeText: "Hallo?",
    jokeType: "Mama",
  }),
});
