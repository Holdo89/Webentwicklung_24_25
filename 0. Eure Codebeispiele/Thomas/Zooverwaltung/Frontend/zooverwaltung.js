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
                list.innerHTML +=`<li> ${element.Tiername}</li>`
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





  

    
        
