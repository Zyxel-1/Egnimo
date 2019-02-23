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
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access},process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{access,token}]);
    return user.save().then(()=>{
        return token;
    })
};
UserSchema.statics.removeJWT = function (token) {
    var jwta = token.toString().slice(7);
    var user = this;
    return user.updateOne({
        $pull:{
            tokens: {jwta}
        }
    });

};

var User = mongoose.model('User',UserSchema);

module.exports = {User};