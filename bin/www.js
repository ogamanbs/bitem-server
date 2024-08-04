#!/usr/bin/env node

const app = require('../app');
let debug = require('debug')('project:server');
let http = require('http');

let normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port > 0) {
        return port;
    }

    return false;
}

let port = normalizePort(process.env.PORT || 8000);
app.set('port', port);

const server = http.createServer(app);

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind); // Added for simpler debugging
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);