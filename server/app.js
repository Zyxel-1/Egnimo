const express = require('express');
const _ = require('lodash');
var validate = require("validate.js");
const {
    constraints
} = require('./validations/constraints')

// Importing models
const {
    User
} = require('./models/user');
// Importing database
var {
    mongoose
} = require('./database/mongoose');
// Setting up express
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());
// -------------------------------------------------------------------------
//                      Routes
// -------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.send('Hello')
});

// -------------------------------------------------------------------------
// Route(/api/register)
//      Takes in a username and a hashed password in a json object from client. Once taken
//      in it generates a token for that user.
app.post('/api/register', async (req, res) => {
    try {
        // Extract data from request
        var body = _.pick(req.body, ['username', 'password']);
        // Validate incoming data
        var failures = validate(body, constraints);
        if(failures){
            throw new Error('Invalid Data.');
        }
        // Store data into user model
        var user = new User(body);
        await user.save();
        // Send successful message
        res.status(200).send('Registration Successful');
    } catch (e) {
        res.status(400).send(`An error has occured: ${e}`);
    }
});
// Route(/api/login)
// Takes in a username and password and returns a token.
app.post('/api/login', async (req, res) => {
    // Validate incoming data
    try{
        var failures = validate(body, constraints);
        if (failures) {
            res.send(failures).status(400);
        }
        // Check Db if they exists
    
        // Return token
        res.status(200).send('Got a Login request')
    } catch(e) {
        res.status(400).send(`An error has occured: ${e}`)
    }
   
});

app.post('/api/profile', async (req,res)=>{
    res.status(200).send('This is a protected route. You have access to it.')
})
//--------------------------------------------------------------------------
//                      Express Setup
//--------------------------------------------------------------------------

app.listen(PORT);
console.log(`Now listening on port: ${PORT}`)