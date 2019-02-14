const mongoose = require('mongoose');

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

// Finds credential in Database
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
module.exports = {User};