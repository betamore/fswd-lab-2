'use strict';

// load the http module, comes with node
var http = require('http'),
    morgan = require('morgan'),
    logger = morgan('dev');

var express = require('express');
var server = express();

server.get('/', function(request, response) {
    response.end('Hello world!');
});

server.get('/:name', function(request, response) {
    response.end('Hello, ' + request.params.name + ' ' + request.query.lastName + '!');
});

// create a server and give it a function to use
// to respond to requests
// var server = http.createServer(function (request, response) {
//     logger(request, response, function() {
//         console.log(request.method + " " + request.url);
//         var requester = request.url.replace('/', '');
//         if (requester) {
//             response.end('Hello, ' + requester + '!');
//         } else {
//             response.end('Hello world!');
//         }
//     });
// });

// allow other modules to use the server
module.exports = server;
