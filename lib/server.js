'use strict';

// load the http module, comes with node
var http = require('http'),
    morgan = require('morgan'),
    logger = morgan('dev');
var bodyParser = require('body-parser');

var express = require('express');
var server = express();

var tasks = [];

server.set('view engine', 'pug');
server.set('views', './views');

server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', function(request, response) {
    response.render('index');
});

server.post('/somepath', function(request, response) {
    var url = '/' + request.body.name;
    if (request.body.lastName || request.body.inseam) {
        url = url + "?";

        if (request.body.lastName) {
            url = url + "lastName=" + request.body.lastName;

            if (request.body.inseam) {
                url = url + '&';
            }
        }

        if (request.body.inseam) {
            url = url + "inseam=" + request.body.inseam;
        }
    }
    console.log(url);
    response.redirect(url);
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
