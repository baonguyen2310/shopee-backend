fetch('http://localhost:5001/api/v1/products', {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJraGFuaDA2IiwidXNlck5hbWUiOiJraGFuaCIsImlhdCI6MTc0MTg3NTUzMywiZXhwIjoxNzQxODc5MTMzfQ.Zq7vMCKlJ3r5_DFqP3N9sWmLvU7cJdRfH_T2B-rbCWg"
    }
})
.then(res => res.json())
.then(data => console.log(data))