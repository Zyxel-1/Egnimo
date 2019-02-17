const expect = require('expect');
const request = require('supertest')
//const {ObjectID} = require('mongodb');
const {app} = require('../app.js');
const {User} = require('../models/user');
const {users,populateUsers} = require('../database/UserSeed');
// Wipes and repopulates test database
beforeEach(populateUsers);

// Testing registration API
describe('POST /api/register', () => {
  it('should register user with valid username and password', (done) => {
    // Creating userdata
    var body = {
      username: 'createUser',
      password: 'StR0NgPaSsW0rD'
    };
    // Sending to API
    request(app)
      .post('/api/register')
      .send(body)
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        // Testing if its stored in the database
        var username = body.username;
        User.findOne({
          username
        }).then((user) => {
          expect(user).not.toBeFalsy();
          expect(user.password).not.toBe(body.password)
          expect(user.salt).not.toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  }).timeout(500);

  it('should NOT passwith with invalid username', (done) => {
    var body = {
      username: '',
      password: 'otherPassword'
    };
    
    request(app)
      .post('/api/register')
      .send(body)
      .expect(400)
      .end(done);
  });

  it('should NOT pass with invalid password', (done) => {
    
    var body = {
      username: 'johnTheSecond',
      password: ''
    };
    
    request(app)
      .post('/api/register')
      .send(body)
      .expect(400)
      .end(done);
  });

  it('should NOT store user if username already exists in DB', (done) => {
    
    var body = {
      username: users.username,
      password: 'irrelevantPassword'
    };

    request(app)
      .post('/api/register')
      .send(body)
      .expect(400)
      .end(done);
  });
});

describe('POST /api/login1',()=>{
  it('should return salt if user is found',()=>{

  });

  it('should NOT return salt if user is not found',()=>{

  });

  it('should NOT return anything if request is invalid',()=>{

  });
});