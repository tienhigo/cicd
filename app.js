const express = require('express')
const app = express();

app.get('/name', (req, res) => {
    res.send("Telmo");
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})