var express = require('express');
var fs = require('fs');
var app = express();

app.get('/me', function(req, res){
    fs.readFile('me.jpg',function (err, data){
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    });
});

app.get('/me2', function(req, res){
    fs.readFile('me2.jpg',function (err, data){
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    });
});

app.get('/me3', function(req, res){
    fs.readFile('me3.jpg',function (err, data){
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    });
});

app.get('/',function(req, res){
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
});

app.listen(8000, function(){
	console.log('start');
});
