
    fetch('http://localhost:5000/all', {
        method: 'GET',
        headers: {  'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then((data) => {
            let text = document.getElementById('tiereliste');
            text.innerHTML = `
            <table class="table">
            <th>Tier ID</th>
            <th>Tier Name</th>
            <th>Tier Art</th>
            
            </table>`;
            data.forEach(ele => {
                text.innerHTML += `
                <tr class="table-row">
                    <td>${ele.id}</td>
                    <td>${ele.tier_name}</td>
                    <td>${ele.tier_art}</td>
                    <button class="delete" onclick="delltierbutton(${ele.id})">Delete</button>
                </tr>
                <br>`;
                })
            })

function addTier() {
    const tierName = document.getElementById('tiername').value;
    const tierArt = document.getElementById('tierart').value;
    const tier = {
        tier_name: tierName,
        tier_art: tierArt
    };
    fetch('http://localhost:5000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tier)
    })
    .then(response => {
        if (response.ok) {
            console.log("Tier added successfully");
            location.reload();
        } else {
            console.error("Failed to add Tier");
        }
    })
}

function delltier() {
    const id = document.getElementById('tierid').value;
    fetch(`http://localhost:5000/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            console.log("Tier deleted successfully");
            location.reload();
        } else {
            console.error("Failed to delete Tier");
        }
    })
}

function delltierbutton(id) {
    fetch("http://localhost:5000/delete", {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    })
    .then(response => {
        if (response.ok) {
            console.log("Tier deleted successfully");
            location.reload();
        } else {
            console.error("Failed to delete Tier");
        }
    })
}