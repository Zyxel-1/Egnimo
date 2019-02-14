const express = require('express');
const _ = require('lodash');
var validate = require("validate.js");
const {constraints} = require('./validations/constraints')

// Importing models
const {User} = require('./models/user');
// Importing database
var {mongoose} = require('./database/mongoose');
// Setting up express
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());
// -------------------------------------------------------------------------
//                      Routes
// -------------------------------------------------------------------------

app.get('/', (req, res)=> {
    res.send('Hello')
});

// -------------------------------------------------------------------------
// Route(/api/register)
//      Takes in a username and a hashed password in a json object from client. Once taken
//      in it generates a token for that user.
app.post('/api/register', (req, res) => {
    // Extract data needed for registration
    var body = _.pick(req.body, ['username', 'password']);
    // validate incoming data
    var failures = validate(body,constraints);
    if(failures){
        res.send(failures).status(400);
    } else{
        // Store incoming data
        var user = new User(body);
        user.save().then(()=>{
            res.send('Registration Successful').status(200);
        }).catch((e)=>{
            res.send(`An error occurred while saving into DB: ${e}`).status(500);
            //res.send('An error occurred while processing your request').status(500)
        });        
    }
});
// Route(/api/login)
// Takes in a username and password and returns a token.
app.post('/api/login', (req, res) => {
    // Validate incoming data
    var failures = validate(body,constraints);
    if(failures){
        res.send(failures).status(400);
    }
    // Check Db if they exists
    
    // Return token
    res.send('Got a Login request')
});
//--------------------------------------------------------------------------
//                      Express Setup
//--------------------------------------------------------------------------

app.listen(PORT);
console.log(`Now listening on port: ${PORT}`)