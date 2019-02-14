'use strict';

// code to test
var server = require('server');

// libraries
var request = require('supertest');
var models = require('../models');

beforeEach(function () {
    return models.sequelize.sync({ force: true });
});

describe('server', function() {
    it('should respond with "Hello world!" on /', function() {
        return request(server)
            .get('/')
            .expect(200, /Hello FSWD!/);
    });

    ['David', 'John', 'Lee'].forEach(function(name) {
        it('should respond with "Hello, ' + name + '!" on /' + name, function() {
            return request(server)
                .get('/' + name)
                .expect(200, new RegExp('Hello, ' + name + '!'));
        });
    });
    //
    // it('should only strip the first /', function() {
    //     return request(server)
    //         .get('/David/Raynes/is/the/fswd/instructor')
    //         .expect(200, 'Hello, David/Raynes/is/the/fswd/instructor!');
    // });

    it('should have a registration page', function () {
        return request(server)
            .get('/users/register')
            .expect(200, /Password Confirm/);
    });

    it('should accept registrations', function () {
        return request(server)
            .post('/users/register')
            .type('form')
            .send({
                username: 'myFancyUser',
                password: 'myPassword',
                password_confirm: 'myPassword'
            })
            // .expect(200, /Hi, myFancyUser/)
            .expect(302)
            .expect('Location', '/users/welcome?username=myFancyUser')
            .then(function () {
                return models.User.findOne({ where: { username: 'myFancyUser' }});
            })
            .then(function (user) {
                expect(user).toBeTruthy();
            });
    });

    it('should reject mismatched passwords on registration', function () {
        return request(server)
        .post('/users/register')
        .type('form')
        .send({
            username: 'myFancyUser',
            password: 'myPassword',
            password_confirm: 'myPassword1'
        })
        .expect(200, /Passwords do not match/);
    });

    it('should reject registration if the user already exists', function () {
        return models.User.create({ username: 'myFancyUser', password: 'myPassword '})
            .then(function() {
                return request(server)
                    .post('/users/register')
                    .type('form')
                    .send({
                        username: 'myFancyUser',
                        password: 'pass',
                        password_confirm: 'pass'
                    })
                    .expect(200, /User already exists/);
            });
    });

    it('should reject improper email addresses', function () {
        return request(server)
            .post('/users/register')
            .type('form')
            .send({
                username: 'myFancyUser',
                password: 'myPassword',
                password_confirm: 'myPassword',
                email: 'this.is.not an email address'
            })
            .expect(200, /Not an email address/);
    });
});
