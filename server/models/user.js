const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var SALT_ROUNDS = 10;

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

UserSchema.pre('validate', function(next){
    const user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_ROUNDS, (err, salt)=>{
            bcrypt.hash(this.password, salt, (err,hash)=>{
                user.password = hash;
                user.salt = salt;
                next();
            });
        });
    }else{
        next();
    }
});

// Validate incoming password
UserSchema.methods.verifyPassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    if(result){
        return true;
    }else{
        return false;
    }
};

// Generate user token
UserSchema.methods.generateJWT = function () {
    var user = this;
    // A user can not have more than one JWT token at a time
    if(user.tokens.length === 0){
        var access = 'auth';
        var token = jwt.sign({_id: user._id.toHexString(),access},process.env.JWT_SECRET).toString();
        user.tokens = user.tokens.concat([{access,token}]);
        user.save();
        return token;
    }else{
        return null;
    }
    
};
UserSchema.statics.removeJWT = function (token) {
    // Remove the bearer portion of the token

    var token = token.toString().slice(7).trim();
    
    return User.updateOne({
        $pull: {
            tokens: token
        }
    });
};

var User = mongoose.model('User',UserSchema);

module.exports = {User};