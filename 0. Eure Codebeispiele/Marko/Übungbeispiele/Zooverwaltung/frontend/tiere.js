function getAllAnimals() {
  fetch("http://localhost:3000/tiere", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("tiere");
      list.innerHTML="";
      data.forEach((element) => {
        
        list.innerHTML += `<li>${element.tiername}</li>`;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
getAllAnimals();

function addNewAnimal() {
  const tiernamevalue = document.getElementById("tiername").value;
  const tierartvalue = document.getElementById("tierart").value;

  const tier = {
    tiername: tiernamevalue,
    tierart: tierartvalue,
  };

  fetch("http://localhost:3000/posttiere", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tier),
  }).then(getAllAnimals());

}
