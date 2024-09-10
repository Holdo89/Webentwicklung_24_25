let usertable = document.getElementById("usertable")
let btn = document.getElementById("btn")
btn.addEventListener("click", () => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        let randomNumber = Math.ceil(Math.random()*data.length)
        console.log("randomNumebr", randomNumber)

            usertable.innerHTML += "<li>"+data[randomNumber].Vorname + " " + data[randomNumber].Nachname + "</li>"; 
      });
  });