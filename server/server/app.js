const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res)=> {
    res.send('Sample Get function')
});
app.post('/api/register', (req, res) => {
    console.log(req.body)
    res.send(`Got the following data: ${req.body.username} and ${req.body.password}`)
})
app.post('/api/login', (req, res) => {
    console.log(req.body)
    res.send('Got a Login request')
});

const PORT = process.env.PORT || 3000
app.listen(PORT);
console.log(`Now listening on port: ${PORT}`)