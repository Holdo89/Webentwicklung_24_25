function getIssLocation(){
    fetch("http://localhost:8090/iss",{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
        },
    })
        .then((response)=>response.json())
        .then((data)=>console.log(data))
}