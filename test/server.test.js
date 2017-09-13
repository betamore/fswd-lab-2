'use strict';

// code to test
var server = require('server');

// libraries
var request = require('supertest');

describe('server', function() {
    it('should respond with "Hello world!" on /', function() {
        return request(server)
            .get('/')
            .expect(200, 'Hello world!');
    });

    // ['David', 'John', 'Lee'].forEach(function(name) {
    //     it('should respond with "Hello, ' + name + '!" on /' + name, function() {
    //         return request(server)
    //             .get('/' + name)
    //             .expect(200, 'Hello, ' + name + '!');
    //     });
    // });
    //
    // it('should only strip the first /', function() {
    //     return request(server)
    //         .get('/David/Raynes/is/the/fswd/instructor')
    //         .expect(200, 'Hello, David/Raynes/is/the/fswd/instructor!');
    // });
});
