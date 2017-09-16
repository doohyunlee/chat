'use strict';
const io = require('socket.io').listen(50000);

io.sockets.on('connection', socket =>{

    socket.emit('connection', {
        type : 'connected'
    });

    socket.on('connection', data => {
	//console.log('data : ', data);
        if(data.type === 'join') {
            socket.join(data.room);
            // depracated
            // socket.set('room', data.room);
            socket.room = data.room;

            socket.emit('system', {
                message : '소진이랑 대화하기얌 나'
            });

            socket.broadcast.to(data.room).emit('system', {
                message : `${data.name} 오빠들 공격하지마!!`
            });
        }

    });

    socket.on('user', data => {
		// depracated
        // socket.get('room', (error, room) => {
        // });

        var room = socket.room;

		console.log('data 11111: ', data);
		var reponse ={}; // response
			reponse.name = data.name;
			//reponse.message = data.message;



//http://sandbox.api.simsimi.com/request.p?key=13900b3a-8610-425a-9c5f-b8a9d2411eb7&lc=ko&ft=1.0&text=안녕

//Key :
//13900b3a-8610-425a-9c5f-b8a9d2411eb7


	var Curl = require( 'node-libcurl' ).Curl;
	var curl = new Curl();
	var message ="";
	var url = "http://sandbox.api.simsimi.com/request.p?key=13900b3a-8610-425a-9c5f-b8a9d2411eb7&lc=ko&ft=1.0&text="+data.message;

	curl.setOpt( 'URL', url );
	curl.setOpt( 'FOLLOWLOCATION', true );
 
	curl.on( 'end', function( statusCode, body, headers ) {

	 body = JSON.parse(body);

		console.log('body : ', body);
		message =   body.response;
		console.log('body reponse : ', body.response);

	/*
		console.info( statusCode );
		console.info( '---' );
		console.info( body.length );
		console.info( '---' );
		console.info( this.getInfo( 'TOTAL_TIME' ) );
	*/

		this.close();
	});
 
		curl.on( 'error', curl.close.bind( curl ) );
		curl.perform();

		reponse.message =message;

        if(room) {
			socket.broadcast.to(room).emit('message', data);
        }
    });

});

