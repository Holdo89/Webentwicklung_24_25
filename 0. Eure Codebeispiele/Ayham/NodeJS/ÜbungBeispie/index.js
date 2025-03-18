
let text = document.getElementById('demo').innerHTML = "Hello World";


fetch("//localhost:8090/jokes/60",{
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    },
}).then((response)=>response.json())
.then((data)=> {
    let text = document.getElementById('demo');
    text.innerHTML = data.jokeText;
    text.style.color = "blue";
});




