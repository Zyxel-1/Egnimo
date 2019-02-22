//**
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const {User} = require('../models/user');

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
            user.verifyPassword(password)
            .then((valid)=>{
                if(!valid){
                    console.log(`Passwords do not match ${password} and verify returned ${valid}`);
                    return done(null,false);
                }
                console.log('Password and user found returning user')
                return done(null,user,{message: 'Logged in successfully!'})
            });
        })
}));

const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JWTStrategy(opts,(jwtPayload, done)=>{
    console.log(`JWT Content: ${JSON.stringify(jwtPayload)}`);
    try{
        return done(null, jwtPayload._id)
    }catch (e){
        done(e)
    }
}))
//*/