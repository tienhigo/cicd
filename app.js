const express = require('express')
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, '/frontend/build')));


app.get('/name', (req, res) => {
    res.send("Telmo hihogit");
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})