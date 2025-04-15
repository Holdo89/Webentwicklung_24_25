function getAllAnimals(){
fetch("http://localhost:3000/all", {
    method: "GET",
    headers: {
        "content-type": "application/json"
    }
}).then((response) => response.json())
  .then((data) => {
    const list = document.getElementById("tiereListe");
    list.innerHTML = "";
    data.forEach((element) => {
        list.innerHTML += `<li>${element.tier_name} (${element.tier_art})</li>`; 
    });
});
}
getAllAnimals();


function addNewAnimal(){
    const tier_name = document.getElementById("tier_name").value;
    const tier_art = document.getElementById("tier_art").value;

    const tier = {
        tier_name:tier_name,
        tier_art:tier_art
    };
fetch("http://localhost:3000/addNewAnimal",{
    method:"POST",
    headers: {
        "content-type": "application/json"
    },
    body:JSON.stringify(tier)
}).then(getAllAnimals())




}