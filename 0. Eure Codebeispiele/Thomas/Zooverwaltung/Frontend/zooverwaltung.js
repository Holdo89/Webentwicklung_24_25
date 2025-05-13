    function getAllAnimals(){

    fetch("http://localhost:3000/getAnimals", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
            const list=document.getElementById("tiere");
            list.innerHTML="";
            data.forEach((element) => {
                list.innerHTML +=`<li> ${element.Tiername}<input type "button" onclick="deleteAnimal(${element.ID})"value="löschen"</input></li>`
            })
})};
getAllAnimals();

function addNewAnimal(){
    const tiernamevalue=document.getElementById("tiername").value
    const tierartvalue=document.getElementById("tierart").value

    const tier ={
        tiername:tiernamevalue,
        tierart:tierartvalue
    }
       





        fetch("http://localhost:3000/addNewAnimal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            
            body: JSON.stringify(tier)
          }).then(getAllAnimals());
    }

    function deleteAnimal(ID){
        fetch("http://localhost:3000/deleteAnimal",{
            method:"DELETE",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({id:ID})
        }).then(getAllAnimals());
        
    }





  

    
        
