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

var models = require('../models');
server.get('/tasks', function(request, response) {
    models.Task.findAll().then(function(tasks) {
        response.render('tasks', { tasks: tasks });
    });
});

server.param('task_id', function(request, response, next, id) {
    models.Task.findById(id).then(function(task) {
        if (!task) {
            response.sendStatus(404);
        } else {
            request.task = task;
            next();
        }
    });
});

server.get('/tasks/:task_id', function(request, response) {
    response.render('task', { task: request.task });
});

server.post('/tasks/:task_id/complete', function(request, response) {
    models.Task.findById(request.params.task_id)
        .then(function(task) {
            return task.markCompleted();
        }).then(function(task) {
            response.redirect('/tasks');
        });
});

server.post('/tasks', function(request, response) {
    var task = request.body.task;

    models.Task.create({ name: task }).then(function() {
        response.redirect('/tasks');
    });
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

server.use('/users', require('./routes/users'));

// allow other modules to use the server
module.exports = server;
