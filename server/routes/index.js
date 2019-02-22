/**
 * /routes/index.js
 * @description:: Index file for the routes used for this application.
 * 
 */
const router = require('express').Router();
const passport = require('passport')
require('../middleware/passport')

// Routes for registration, authentication , and logging off.
router.use('/api/user',require('./user/user'))

// Protected Routes
router.use('/api',passport.authenticate('jwt',{session: false}),require('./main/main'))

module.exports = router;