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
// Hashing the password and getting salt
UserSchema.methods.setPassword = function (password) {
    this.salt = bcrypt.genSaltSync(SALT_ROUNDS);
    this.password = bcrypt.hashSync(password, this.salt);
}

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
UserSchema.methods.generateJWT = function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access},process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{access,token}]);
    return user.save().then(()=>{
        return token;
    })
}

UserSchema.methods.findByToken = function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }catch(e){
        return Promise.reject();
    }
    return User.findOne({
        _id: decoded._id,
        'tokens.token':token,
        'tokens.access': 'auth'
    })
}
// Finds credentials in the database
UserSchema.methods.findByCredentials = function (email, password) {
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

var User = mongoose.model('User',UserSchema);

module.exports = {User};