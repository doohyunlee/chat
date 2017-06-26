var express = require('express');
//var fs = require('fs');
var app = express();

app.locals.pretty= true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

/*
app.get('/',function(req, res){
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data); 
        res.end();
    });
});
*/

app.get('/',function(req, res){
		res.render('index');

		console.log("id : "res.query.id);

});

app.listen(8000, function(){
	console.log('start');
});
