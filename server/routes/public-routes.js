var router = require('express').Router();
const {constraints} = require('../validations/constraints');
const {User} = require('../models/user');
var validate = require("validate.js");
const passport = require('passport');
require('../middleware/passport')

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
        var body = req.body
        // Validate incoming data
        var failures = validate(body, constraints);
        if(failures){
            throw new Error('Please include a valid Username or Password.');
        }
        // Store data into user model
        const user = new User({username:body.username});
        user.setPassword(body.password);
        await user.save();
        // Send successful message
        res.status(201).send('Registration Successful');
    } catch (e) {
        res.status(400).send(`An error has occured: ${e}`);
    }
});
//-------------------------------------------------------------------------
// Route(POST /api/login)
// Takes in a username and password and returns a json web token.
router.post('/api/login',
(req, res,next) => {                         
    passport.authenticate('local',{session: false},(err,user,info)=>{
        if(err|| !user){
            return res.status(400).json({
                message: 'Failed to login.',
                user: user
            });
        }
        // Generating JWT for user
        req.login(user,{session:false},(err)=>{
            if(err){res.send(err);}
            user.generateJWT().then((token)=>{
                console.log('Your in login');
                res.header('x-auth',token).send(user);
            });
        });
    })(req,res);
});
//-------------------------------------------------------------------------
// Route(GET /api/login)
//
router.get('/login',(req,res)=>{
    res.status(400).send('Authentication went wrong.')
})
//-------------------------------------------------------------------------
// Route(GET /api/login)
//
router.get('/api/logout',(req,res)=>{
    req.logout();
    res.send('ok')
})
//-------------------------------------------------------------------------
// Route(GET /api/login)
//
router.get('/api/private',
(req,res)=>{
    res.status(200).send('You are in a private route.')
})
module.exports = router;