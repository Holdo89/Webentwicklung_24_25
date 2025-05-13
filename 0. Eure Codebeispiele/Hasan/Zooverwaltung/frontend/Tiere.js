function getAllAnimals() {
    fetch("http://localhost:4000/Tiere", {
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
                list.innerHTML += `<li>${element.Tiername} <input type="button" value="löschen" onClick="deleteItem(${element.ID})"></input></li>`;          
              });
        });
    }
    getAllAnimals();
    
    function deleteItem(id){
        fetch("http://localhost:4000/deleteAnimal", {
            method: "DELETE",
            headers: { "Content-Type": "application/json",    },
            body: JSON.stringify({id:id})
        }).then(getAllAnimals());
    }

    function addNewAnimal() {
        const tiername = document.getElementById("tiername").value
        const tierart = document.getElementById("tierart").value

        const tiere = {
            tiername: tiername,
            tierart: tierart
        };
        fetch("http://localhost:4000/addNewAnimal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tiere)
        })
        .then(getAllAnimals())

    }
