const express = require('express');
const _ = require('lodash');
var {User} = require('./models/user');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000
// -------------------------------------------------------------------------
//                      Routes
// -------------------------------------------------------------------------

app.get('/', (req, res)=> {
    res.send('Hello')
});
// Route(/api/register)
// Takes in a username and a hashed password in a json object from client. Once taken
// in it generates a token for that user.
app.post('/api/register', (req, res) => {
    var body = _.pick(req.body, ['username', 'password']);
    res.send(`Got the following data: ${req.body.username} and ${req.body.password}`)
})
app.post('/api/login', (req, res) => {
    console.log(req.body)
    res.send('Got a Login request')
});
//--------------------------------------------------------------------------
//                      Express Setup
//--------------------------------------------------------------------------
app.listen(PORT);
console.log(`Now listening on port: ${PORT}`)