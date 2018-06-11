'use strict';

// load the http module, comes with node
var express = require('express'),
    http = require('http'),
    morgan = require('morgan'),
    logger = morgan('dev');

var app = express();

app.set('view engine', 'pug');

// GET /
app.get('/', function(request, response) {
    //response.end('Hello world!');
    response.render('index');
});

// // GET /David
// app.get('/David', function(requst, response) {
//     response.end('Hello, David!');
// });

// // GET /John
// app.get('/John', function(request, response) {
//     response.end('Hello, John!');
// });

// GET /?????
app.get('/:name', function(request, response) {
    response.render('name', { name: request.params.name, lastName: request.query.lastName });
});

app.get('/:name/:lastName', function(request, response) {
    response.render('name', request.params);
})

// // create a server and give it a function to use
// // to respond to requests
// var server = http.createServer(function (request, response) {
//     logger(request, response, function() {
//         if (request.url !== '/') {
//             response.end('Hello, ' + request.url.replace('/', '') + '!');
//         } else {
//             response.end('Hello world!');
//         }
//     });
// });

// allow other modules to use the server
module.exports = app;
