'use strict';

// load the http module, comes with node
var http = require('http'),
    morgan = require('morgan'),
    logger = morgan('dev');
var bodyParser = require('body-parser');

var express = require('express');
var server = express();

server.set('view engine', 'pug');
server.set('views', './views');

server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', function(request, response) {
    response.render('index');
});

server.post('/somepath', function(request, response) {
    // response.render('name', { name: request.body.name });
    response.redirect('/' + request.body.name);
});

server.get('/:name', function(request, response) {
    var name = request.params.name;
    if (request.query.lastName) {
        name = name + ' ' + request.query.lastName;
    }
    response.render('name', { 
        name: name,
        // lastName: request.query.lastName,
        inseam: request.query.inseam
    });
    // var str = 'Hello, ' + request.params.name;

    // if (request.query.lastName) {
    //     str = str + ' ' + request.query.lastName;
    // }

    // str = str + '!';

    // if (request.query.inseam) {
    //     str = str + ' And I understand your inseam is ' + request.query.inseam + 'inches';
    // }
    // response.end(str);
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
