
'use strict';

// load our server module
var server = require('./server'),
    logger = require('./logger');

// tell the server to listen on a specific port
server.listen(8000, function() {
    logger.info('Server listening on port 8000!');
});
