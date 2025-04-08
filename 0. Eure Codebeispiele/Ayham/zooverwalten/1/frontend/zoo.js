
    fetch('http://localhost:5000/all', {
        method: 'GET',
        headers: {  'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then((data) => {
            let text = document.getElementById('tiereliste');
            data.forEach(ele => {
                text.innerHTML += `<li>${ele.tier_name}</li>`;
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