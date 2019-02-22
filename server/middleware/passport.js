/**
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {User} = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  console.log('Finding person in database')
  User.findOne({email}), (err,user)=>{
    if(err){return done(err);}
    if(!user){ return done(null,false,{erros: 'User not found.'});}
    if(!user.verifyPassword(password)) {return done(null,false,{errors: 'Password is incorrect'});}
    return done(null,user);
  };
}));
 */