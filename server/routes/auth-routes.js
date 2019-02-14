const router = require('express').Router();

// Auth Login

router.get('/login',(req,res)=>{
    res.send('hello');

})

// Auth with google
router.get('/google',(req,res)=>{
    res.send('logging in with google.')
})