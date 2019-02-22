// Setting up env variables
require('./config/config');

const express = require('express');
const{mongoose} = require('./database/mongoose')
var passport = require('passport')
require('./middleware/passport')

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
// Calls the index file for all routes for this project.
app.use('/',require('./routes/index.js'));

module.exports.app = app;


