const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(SALT_ROUNDS);
    var hash = bcrypt.hashSync(password, salt);
    return {salt: salt,hash: hash}
};
module.exports = {hashPassword};