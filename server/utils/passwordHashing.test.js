const expect = require('expect');

const {app} = require('../app.js');
const {hashPassword} = require('./passwordHashing');

describe('Testing PasswordHashing.js',()=>{
    it('should hash the password',()=>{
        var password = 'StR0NgPaSsW0rD';
        var result = hashPassword(password);
        expect(result.salt).not.toBeUndefined();
        expect(result.hash).not.toBeUndefined();
        expect(result.hash).not.toEqual(password);
    })
})