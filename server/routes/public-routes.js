var router = require('express').Router();
const {constraints} = require('../validations/constraints');
const {User} = require('../models/user');
const _ = require('lodash');
var validate = require("validate.js");
const hashing = require('../utils/passwordHashing')
//-------------------------------------------------------------------------
// Default route
router.get('/', (req, res) => {
    res.send('Hello')
});
//-------------------------------------------------------------------------
// Route(/api/register)
// Takes in a username and hashed password to store in the database.
router.post('/api/register', async (req, res) => {
    try {
        // Extract data from request
        var body = _.pick(req.body, ['username', 'password']);
        // Validate incoming data
        var failures = validate(body, constraints);
        if(failures){
            throw new Error('Invalid Data.');
        }
        // Hashing Password and salt generation
        var credentials = hashing.hashPassword(body.password);
        // Store data into user model
        var user = new User({username:body.username,password:credentials.hash,salt:credentials.salt});
        await user.save();
        // Send successful message
        res.status(200).send('Registration Successful');
    } catch (e) {
        res.status(400).send(`An error has occured: ${e}`);
    }
});
//-------------------------------------------------------------------------
// Route(/api/login)
// Takes in a username and password and returns a json web token.
router.post('/api/login', async (req, res) => {
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

module.exports = router;