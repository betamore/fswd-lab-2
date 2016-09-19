'use strict';

// load the http module, comes with node
// var http = require('http');
//
// // create a server and give it a function to use
// // to respond to requests
// var server = http.createServer(function (request, response) {
//     console.log(request.method + ' request for "' + request.url + '"');
//     var who = request.url.replace('/', '');
//     if (who) {
//       response.end('Hello, ' + who + '!');
//     } else {
//       response.end("Hello world!");
//     }
// });
//

var express = require('express');
var server = express();

server.use(function(request, response, next) {
  if (request.query.lastName) {
    request.lastName = request.query.lastName;
  }

  next();
});

server.use(function(request, response, next) {
  if (request.lastName && request.lastName === 'Franklin') {
    response.redirect('/Benjamin');
    // response.status(404).end("Nope, sorry. Can't help you.");
  } else {
    next();
  }
})

server.get('/', function(request, response) {
  if (request.lastName) {
    response.end('Greetings, Citizen ' + request.lastName);
  } else {
    response.end('Hello world!');
  }
});

server.get('/:name', function(request, response) {
  if (request.lastName) {
    response.end('Hello, ' + request.params.name + ' ' + request.lastName + '!')
  } else {
    response.end('Hello, ' + request.params.name + '!');
  }
});

// allow other modules to use the server
module.exports = server;
