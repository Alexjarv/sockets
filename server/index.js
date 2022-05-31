const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {

    console.log(`user    connected | id: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data.room);
        console.log(`User with ID: ${data.username} joined room ${data.room}`);

        const messageData = {
            room : data.room,
            author : 'system',
            message : `${data.username} has joined the chat`,
            time : new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getSeconds()
        };

        socket.to(data.room).emit('receive_message', messageData);

    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    })

    socket.on('disconnect', () => {
        console.log(`user disconnected | id: `, socket.id)
    })

})

server.listen(3001, () =>{
    console.log('server running');
});

