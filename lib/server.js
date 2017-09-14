'use strict';

// load the http module, comes with node
var http = require('http'),
    morgan = require('morgan'),
    logger = morgan('dev');

// create a server and give it a function to use
// to respond to requests
var server = http.createServer(function (request, response) {
    logger(request, response, function() {
        var greeting = request.method === 'POST' ? 'Hiya' : 'Hello';
        if (request.url === '/') {
            response.end(greeting + ' world!');
        } else {
            response.end(greeting + ', ' + request.url.substring(1) + "!");
        }
    });
});

// allow other modules to use the server
module.exports = server;
