const {User} = require('./user');
const {ObjectID} = require('mongodb');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();

const users = [
    {
        _id: userOneId,
        username: 'TestUser1',
        password: '$2a$10$WiBwLVLVJ736xurw3Vd7qeHAD/iCCwx/pkW5F0cj31uh7nbVaYYKG',
        salt: '$2a$10$WiBwLVLVJ736xurw3Vd7qe'
    },
    {
        _id: userThreeId,
        username: 'TestUser2',
        password: '$2a$10$.z.YzzcHAzw2Yn6W/F4rku/lPikmyKiAGN4eHYgvLT6vyojm.ZwmG',
        salt: '$2a$10$.z.YzzcHAzw2Yn6W/F4rku'
    },
    {
        _id: userTwoId,
        username: 'TestUser3',
        password: '$2a$10$gJQSQRrDWfd3dGdgA/GGaOd9tj0ioKFvgrgEDdEa0hduUfn5dZH5i',
        salt: '$2a$10$gJQSQRrDWfd3dGdgA/GGaO'
    }
];

const populateUsers = (done)=>{
    User.deleteMany({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        var userThree = new User(users[2]).save();
        return Promise.all([userOne,userTwo,userThree]);
        
    }).then(()=>{
        done();
    })
}

module.exports = {users,populateUsers}