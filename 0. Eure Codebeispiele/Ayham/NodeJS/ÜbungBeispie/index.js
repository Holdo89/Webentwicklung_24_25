
document.getElementById('demo').innerHTML = "Hello World";


fetch("//localhost:8090/jokes/120",{
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

fetch("//localhost:8090/add",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        id:120,
        jokeText:"Hello Coders",
        jockType:"Programming"}
    )
}).then((response)=>response.json());
