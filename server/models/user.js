const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
var SALT_FACTOR = 10;
// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
    isOnline: {
        type: Boolean,
        required: false,
    },
    salt: {
        type: String,
        required: false
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

var User = mongoose.model('User',UserSchema);


// Finds credentials in the database
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    // Returns user that is found
    return User.findOne({email}).then((user)=>{
        // reject promise if there isn't any matches
        if(!user){
            return Promise.reject();
        }
        // If found compare password from function to password in user found.
        return new Promise((resolve,reject)=>{
            // Use bcrypt.compare to compare password and user.password
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res){
                    resolve(user);
                } else{
                    reject();
                }
            });
        });
    });
};

// Hashes the password before being inserted into the database
UserSchema.pre('save', function (next) {
    console.log('Inside Hashing algo')
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});
module.exports = {User};