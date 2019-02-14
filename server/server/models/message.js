const mongoose = require('mongoose');
const validator = require('validator');

var MessageSchema = new mongoose.Schema({
    from:{
        type: number,
        trim: true
    },
    to:{
        type: number,
        trim: true
    },
    createdAt: {
        type: number,
        default: null
    },
    message: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 500
    }
})