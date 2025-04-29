function getCalender() {
    fetch("http://localhost:3001/bookbay", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const list = document.getElementById("calender");
        list.innerHTML = "";
        data.forEach((element) => {
          list.innerHTML += `<li>${element.date} <i class="material-icons" onclick="deleteAnimal(${element.id})">delete</i></li>`;
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  getAllAnimals();