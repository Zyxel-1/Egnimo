const router = require('express').Router();

router.post('/api/profile', async (req,res)=>{
    res.status(200).send('This is a protected route. You have access to it.')
});

module.exports = router;