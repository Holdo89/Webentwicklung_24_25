function getIsslocation(){
    fetch("http://localhost:3000/iss",
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"

            },
    }).then((response)=>response.json())
    .then((data) => console.log(data));

}
