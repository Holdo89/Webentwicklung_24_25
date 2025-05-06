document.getElementById("demo").innerHTML="Hello World";

fetch("http://localhost:3000/jokes/102",{
  method:"GET",
  headers:{
    "Content-Type":"application/json"

    
  }
}).then((response)=>response.json())
 .then((data)=>{
    document.getElementById("demo").innerHTML=data.jokeText;
 })

 fetch("http://localhost:3000/add",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
        id:102,
       jokeText:"hello",
        jokeType:"Physic"})


  }).then((response)=>response.json())
   .then((data)=>{
    console.log(data);
      
   })

   
   



