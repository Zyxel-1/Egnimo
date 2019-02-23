const {User} = require('../user');
const {ObjectID} = require('mongodb'
);
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();
const userFourId = new ObjectID();

const users = [
    {
        _id: userOneId,
        username: 'TestUser1',
        password: 'GtMv7gR2mB4%nn+r'
    },
    {
        _id: userTwoId,
        username: 'TestUser2',
        password: '2%bLGm5KuTDu8_qw',
    },
    {
        _id: userThreeId,
        username: 'TestUser3',
        password: 'password123'
    },
    {
        _id: userFourId,
        username: 'TestUser4',
        password: 'Z=U@q9aZhx@QgzLQ',
        tokens:[{
            access: 'auth',
            token: jwt.sign({_id: userFourId,access:'auth'},process.env.JWT_SECRET).toString()
        }]

    }
];

const populateUsers = (done)=>{
    User.deleteMany({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        var userThree = new User(users[2]).save();
        var userFour = new User(users[3]).save();
        return Promise.all([userOne,userTwo,userThree,userFour]);
        
    }).then(()=>{
        done();
    })
}

module.exports = {users,populateUsers}