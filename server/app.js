// Setting up env variables
require('./config/config');

const express = require('express');
const{mongoose} = require('./database/mongoose')
var passport = require('passport')

//--------------------------------------------------------------------------
//                      Express Setup
//--------------------------------------------------------------------------
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session())
app.listen(PORT);
console.log(`Now listening on port: ${PORT}`)
// -------------------------------------------------------------------------
//                      Routes
// -------------------------------------------------------------------------
// Calls all the public routes that do not require Authentication
app.use('/',require('./routes/index.js'));
//app.use('/',require('./routes/public-routes'));
// Calls all the private routes that require Authentication
//app.use('/auth',require('./routes/auth-routes')); 

module.exports.app = app;


