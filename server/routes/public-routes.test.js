const expect = require('expect');
const request = require('supertest')
const {
    ObjectID
} = require('mongodb');

const {
    app
} = require('../app.js');
const {
    User
} = require('../models/user');

describe('Sample Test', () => {
    it('should pass with no problem', () => {

    })
})

// Testing registration API
describe('POST /api/register', () => {
    it('should register user with valid username and password', (done) => {

        // Creating userdata
        var body = {
            username: 'johndoe123',
            password: 'StR0NgPaSsW0rD'
        }
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
                User.findOne({username}).then((user) => {
                    expect(user).not.toBeFalsy();
                    expect(user.password).not.toBe(body.password)
                    expect(user.salt).not.toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });
});

it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = '123mnb!';

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).not.toBeFalsy();
        expect(res.body._id).not.toBeFalsy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        User.findOne({email}).then((user) => {
          expect(user).not.toBeFalsy();
          expect(user.password).not.toBe(password);
          done();
        }).catch((e)=>{done(e);})
      });
  });