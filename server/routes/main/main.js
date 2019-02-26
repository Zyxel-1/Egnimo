/**
 * /routes/protected-routes.js
 * @description:: All private routes for the application that needs authentication to be used.
 * 
 */
const router = require('express').Router();

router.get('/profile', (req,res)=>{
    res.status(200).send('This is a protected route. You have access to it.')
});

router.post('/chat',(req,res)=>{
    // Figure out how to create a websocket between two users.
    // Figure out how to exchange keys
    //

    // What i want
    /**
     * Step One: Client1 side generates a public key to be shared with the person they want to communicate
     *           with.
     * Step Two: Client2 generates his own public key and shares it with client1
     * Step Three: Client1 inserts client2 pub key
     * Step Four: Client2 insertes client1 pub key
     * Step Five: A web socket is generated and conecting both users
     * Step six: With each client having thier own private key on thier local machines the messeges comes in 
     *          encrypted and send to the other client.
     * 
     * NOTE: The server will have no idea what the messages are or be able to decrypt any messages.
     */
})

module.exports = router;