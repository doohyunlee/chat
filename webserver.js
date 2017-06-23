var express = require('express');
var fs = require('fs');
var app = express();

app.get('/',function(req, res){
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data); 
        res.end();
    });
});

app.use(express.static('public'));

app.listen(8000, function(){
	console.log('start');
});
