var router = require('express').Router();
const {constraints} = require('../validations/constraints');
const {User} = require('../models/user');
var validate = require("validate.js");
const passport = require('passport');
const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    (username, password, done) => {
        // Find User in Database
        console.log('Inside local strategy')
        User.findOne({username}).then((user,err)=>  {
            if(err){
                console.log(`An err happened: ${err}`)
                return done(err)}
            if(!user){
                console.log(`No user found: ${user}`)
                return done(null, false)}
            // Checking if passwords match
            user.verifyPassword(password).then((valid)=>{
                if(!valid){
                    console.log(`Passwords do not match ${password} and verify returned ${valid}`);
                    return done(null,false);
                }
                console.log('Password and user found returning user')
                return done(null,user,{message: 'Logged in successfully!'})
            });
        })
}));
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
// Route(/api/login)
// Takes in a username and password and returns a json web token.
router.post('/api/login',
//passport.authenticate('local',{failureRedirect: '/login'}),
(req, res,next) => {
    console.log('hello')                                
    passport.authenticate('local',{session: false},(err,user,info)=>{
        console.log(`this is the user logging in : ${user}`);
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
    })
});

router.get('/login',(req,res)=>{
    res.status(400).send('Authentication went wrong.')
})
router.get('/logout',(req,res)=>{
    req.logout();
    res.send('ok')
})
router.get('/private',
(req,res)=>{
    res.status(200).send('You are in a private route.')
})
module.exports = router;