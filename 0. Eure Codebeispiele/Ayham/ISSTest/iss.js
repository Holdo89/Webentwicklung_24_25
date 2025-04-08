function getiss() {
    fetch('https://api.wheretheiss.at/v1/satellites/25544',{
        method: 'GET'})
        .then(response => response.json())
        .then(data => {
            const issPosition = document.getElementById('issPosition');
            issPosition.innerHTML = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
        })
}

function getiss2() {
    fetch("http://localhost:3000/iss",
        {
        method:"GET",
        headers: {
            'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            const issPosition = document.getElementById('issPosition');
            issPosition.innerHTML = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
        })
}