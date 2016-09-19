'use strict';

// code to test
var server = require('../lib/server');

// libraries
var request = require('supertest');

describe('server', function() {
    it('should respond with "Hello world!" on /', function(done) {
        request(server)
            .get('/')
            .expect(200, 'Hello world!', done);
    });

    ['David', 'John', 'Lee'].forEach(function(name) {
        it('should respond with "Hello, ' + name + '!" on /' + name, function(done) {
            request(server)
                .get('/' + name)
                .expect(200, 'Hello, ' + name + '!', done);
        });
    });

    it('should use the last name', function(done) {
      request(server)
        .get('/David?lastName=Raynes')
        .expect(200, 'Hello, David Raynes!', done);
    });
});
