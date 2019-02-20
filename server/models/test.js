var bcrypt = require('bcryptjs')
var SALT_ROUNDS = 10;
var password = 'rob123123';

var salt = bcrypt.genSaltSync(SALT_ROUNDS);
var hash = bcrypt.hashSync(password, salt);

bcrypt.compare(password, hash, (err, res)=> {
   console.log(res)
});
