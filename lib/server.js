'use strict';

// load the http module, comes with node
var http = require('http');

// create a server and give it a function to use
// to respond to requests
var server = http.createServer(function (request, response) {
    console.log(request.method + ' request for "' + request.url + '"');
    response.end("Hello world!");
});

// allow other modules to use the server
module.exports = server;
