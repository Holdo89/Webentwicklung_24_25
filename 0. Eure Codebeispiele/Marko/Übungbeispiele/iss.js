function getIssLocation(){
    fetch("https://api.wheretheiss.at/v1/satellites/25544",{
        method:"GET",
        
    })
        .then((response)=>response.json())
        .then((data)=>{
            document.getElementById("latitude").innerText = `Latitude: ${data.latitude}`;
            document.getElementById("longitude").innerText = `Longitude: ${data.longitude}`;
    })
}
