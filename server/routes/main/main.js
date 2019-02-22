/**
 * /routes/protected-routes.js
 * @description:: All private routes for the application that needs authentication to be used.
 * 
 */
const router = require('express').Router();

router.get('/profile', 
(req,res)=>{
    res.status(200).send('This is a protected route. You have access to it.')
});

module.exports = router;