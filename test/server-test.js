'use strict';

// code to test
var server = require('../lib/server');

// libraries
var request = require('supertest');

describe('server', function() {
    it('should respond with Hello world!', function(done) {
        request(server)
            .get('/')
            .expect(200, 'Hello world!', done);
    });
});
