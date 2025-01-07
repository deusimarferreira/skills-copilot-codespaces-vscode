// Create web server
const express = require('express');
const app = express();
// create server
const http = require('http');
const server = http.createServer(app);
// create socket
const socket = require('socket.io');
const io = socket(server);

// create comments array
let comments = [
    {name: 'John', message: 'Hello'},
    {name: 'Jane', message: 'Hi'}
];

// when client connects
io.on('connection', (socket) => {
    console.log('New user connected');
    // send comments array to client
    socket.emit('loadComments', comments);
    // when client sends new comment
    socket.on('newComment', (data) => {
        // add new comment to comments array
        comments.push(data);
        // send comments array to all clients
        io.emit('loadComments', comments);
    });
});

// listen to port 8080
server.listen(8080, () => {
    console.log('Server started');
});