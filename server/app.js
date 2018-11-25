const express = require('express');
const app = express();
app.use(express.json());

//app.use(express.static('public'))
app.get('/', function (req, res) {
    res.send('Sample Get function')
});
app.post('/api/register', function (req, res) {
    console.log(req.body)
    res.send('Got a POST request')
})
app.post('/api/login', (res, req) => {
    res.send('Login')
});

const PORT = process.env.PORT || 3000
app.listen(PORT);
console.log(`Now listening on port: ${PORT}`)