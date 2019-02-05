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
    response.redirect('/' + request.body.name);
});

server.get('/:name', function(request, response) {
    var name = request.params.name;
    if (request.query.lastName) {
        name = name + ' ' + request.query.lastName;
    }
    response.render('name', { 
        name: name,
        inseam: request.query.inseam
    });
});


// allow other modules to use the server
module.exports = server;
