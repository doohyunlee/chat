'use strict';
const io = require('socket.io').listen(50000);

io.sockets.on('connection', socket =>{

    socket.emit('connection', {
        type : 'connected'
    });

    socket.on('connection', data => {

        if(data.type === 'join') {

            socket.join(data.room);

            // depracated
            // socket.set('room', data.room);
            socket.room = data.room;

            socket.emit('system', {
                message : '소진이랑 대화하기'
            });

            socket.broadcast.to(data.room).emit('system', {
                message : `${data.name} 오빠 왔어?`
            });
        }

    });

    socket.on('user', data => {

        // depracated
        // socket.get('room', (error, room) => {
        // });

        var room = socket.room;

        if(room) {
            socket.broadcast.to(room).emit('message', data);
        }
    });

});

