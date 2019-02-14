const mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var user = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

var User = mongoose.model('User',user);

module.exports = {User};