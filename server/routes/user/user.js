/**
 * /routes/public-routes.js
 * @description:: All routes that are public without authentication
 * 
 */

var router = require('express').Router();

var validate = require("validate.js");
const {constraints} = require('../../validations/constraints');

const passport = require('passport');
require('../../middleware/passport')

const {User} = require('../../models/user');

//-------------------------------------------------------------------------
// Default route
router.get('/', (req, res) => {
    res.send('Hello')
});
//-------------------------------------------------------------------------
// Route(/api/register)
// Takes in a username and hashed password to store in the database.
router.post('/register', async (req, res) => {
    try {
        // Extract data from request
        var body = req.body
        // Validate incoming data
        var failures = validate(body, constraints);
        if(failures){
            throw new Error('Please include a valid Username or Password.');
        }
        // Store data into user model
        const user = new User(body);
        //user.setPassword(body.password);
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
router.post('/login',
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
                console.log('Logged in')
                res.header('Authorization',token).json({
                    message: 'Login Successful'
                });
            }).catch((e)=>{
                console.log('An Error Occured')
                res.status(500).json({
                    message: 'You are alread authenticated.'
                })
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
// Route(GET /api/logout)
//
router.get('/logout',
passport.authenticate('jwt',{session: false}),
(req,res)=>{
    //req.logout();
    User.removeJWT(req.header('Authorization'));
    res.send('ok');
})
module.exports = router;