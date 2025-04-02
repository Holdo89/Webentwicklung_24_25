function getIssLocation(){
    fetch("http://localhost:3000/iss",{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
        },
    })
        .then((response)=>response.json())
        .then((data)=>{
            document.getElementById("latitude").innerText = `Latitude: ${data.latitude}`;
            document.getElementById("longitude").innerText = `Longitude: ${data.longitude}`;
    })
}
