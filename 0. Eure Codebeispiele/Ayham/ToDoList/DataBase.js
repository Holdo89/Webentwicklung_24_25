fetch("//localhost:5000/regist", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        Username: Username.body,
        Password: Password.body,
        Id : Id.body
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Fehler:', error);
});
