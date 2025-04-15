function getAllAnimals() {
  fetch("http://localhost:5000/Tiere", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("tiere");
      list.innerHTML = "";
      data.forEach((element) => {
        list.innerHTML += `<li>${element.tiername} <input type="button" value="löschen" onClick="deleteAnimal(${element.id})"></input></li>`;
      });
    });
}

getAllAnimals();

function deleteAnimal(id) {
  fetch("http://localhost:5000/deleteAnimal", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  }).then(getAllAnimals());
}

function addNewAnimal() {
  const tiernamevalue = document.getElementById("tiername").value;
  const tierartvalue = document.getElementById("tierart").value;

  const tier = {
    tiername: tiernamevalue,
    tierart: tierartvalue,
  };

  fetch("http://localhost:5000/addNewAnimal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tier),
  }).then(getAllAnimals());
}
