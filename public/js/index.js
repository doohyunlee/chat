	//var serverURL = '13.124.67.79:50000';

	var serverURL = '115.68.226.18:50000';
	//var serverURL = 'localhost:50000';



    var name = 'guest';
  //  var name = $('#my_id').val();
    var room = '100';
    var socket = null;
	//var XSSfilter = function(content) { return content.replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
	var xssfilter = new xssFilter();
	function writeMessage(type, name, message) {


//console.log('type :', type);



		if(name.length > 10 || message.length > 100){
			alert('아잉 소진이 아파요');
			return false;		
		}
		
        var html = '<div>{MESSAGE}</div>';
        var printName = '';
			printName = name + ' : ';

		if(name  === "me" || name  === "me2" || name  === "me3"){


	        if(type === "me") {
				html = '<div class="me"><img src="image/'+name+'.jpg" />{MESSAGE}</div>';
			} else {
				 html = '<div><img src="/'+name+'" />{MESSAGE}</div>';
			}
			printName = '';
		}		
			
		message = xssfilter.filter(message);
		//message = XSSfilter(message);
        html = html.replace('{MESSAGE}', printName + "<p>"+message+"</p>");

        $(html).appendTo('.j-message');
        $('body').stop();
        $('body').animate({scrollTop:$('body').height()}, 500);

    }

    function sender(text,name) {



		if(name.length > 10 || text.length > 100){
			alert('아잉 소진이 아파요');
			return false;		
		}

		//text = XSSfilter(text);
		text = xssfilter.filter(text);
        socket.emit('user', {
            name : name,
            message : text
        });





        writeMessage('me', name, text);
    }

    $(document).ready(function() {

	//name = $('#my_id').val();
	//console.log('name :', name);
        socket = io.connect(serverURL);
		
        socket.on('connection', function(data) {
           //console.log('here come');

            if(data.type === 'connected') {

				//console.log("name -- ", name);
                socket.emit('connection', {
                    type : 'join',
                    name : name,
                    room : room
                });
            }
        });

        socket.on('system', function(data) {
            writeMessage('system', 'system', data.message);
        });

        socket.on('message', function(data) {



		//	console.log("data ;;; ", data);



				


            writeMessage('other', data.name, data.message);
        });

        $('#message-button').click(function() {
            var $input = $('#message-input');
		        name = $('#my_id').val();	
            var msg = $input.val();
				sender(msg,name);
				$input.val('');
				$input.focus();
        });

        $('#message-input').on('keypress', function(e) {

            if(e.keyCode === 13) {
                var $input = $('#message-input');
				name = $('#my_id').val();
                var msg = $input.val();
                sender(msg, name);
                $input.val('');
                $input.focus();
            }

        });

    });
