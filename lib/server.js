'use strict';

// load the http module, comes with node
var http = require('http'),
    morgan = require('morgan'),
    logger = morgan('dev');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var express = require('express');
var server = express();

var models = require('../models');

server.set('view engine', 'pug');
server.set('views', './views');

server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

var SequelizeStore = require('connect-session-sequelize')(session.Store);
var sessionStore = new SequelizeStore({
    db: models.sequelize
});
sessionStore.sync();
server.use(session({
    secret: 'Shhhhh!',
    store: sessionStore,
    saveUninitialized: true,
    resave: false
}));

server.use(function(request, response, next) {
    console.log(request.session);
    if (request.session && request.session.user_id) {
        models.User.findById(request.session.user_id)
            .then(function(user) {
                request.user = user;
                next();
            })
    } else {
        next();
    }

});

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

server.get('/tasks', async function(request, response) {
    var [ tasks, users ] = await Promise.all([ models.Task.findAll(), models.User.findAll() ]);
    response.render('tasks', { tasks, users });
});

// server.get('/tasks', function(request, response) {
//     var taskPromise = models.Task.findAll();
//     var userPromise = models.User.findAll();
//     Promise.all([ taskPromise, userPromise ])
//         .then(function(data) {
//             var tasks = data[0];
//             var users = data[1];
//         })
// })

server.param('task_id', function(request, response, next, id) {
    models.Task.findById(id, { include: [models.User]}).then(function(task) {
        if (!task) {
            response.sendStatus(404);
        } else {
            request.task = task;
            next();
        }
    });
});

server.get('/tasks/:task_id', function(request, response) {
    models.User.findAll().then(function(users) {
        response.render('task', { task: request.task, users: users });
    })
});

server.post('/tasks/:task_id/assign', function(request, response) {
    models.User.findById(request.body.user_id)
        .then(function(user) {
            if (user) {
                user.addTask(request.task)
                    .then(function() {
                        response.redirect('/tasks/' + request.task.id);
                    })
            }
        })
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
