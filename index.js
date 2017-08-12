var http = require('http');
var fs = require('fs');
var ip = require('ip');
var url = require('url');
var express = require('express');

var app = express();

var server = http.Server(app);
server.listen(80, function(){
	console.log('listenning at port 8080');	                          		// cho server lắng nghe ở cổng 8080
	console.log('server run at '+ip.address()+' ip address');             	// in địa chỉ ip của server
});

app.get('/', function(req, res){
	fs.readFile('index.txt', function(err, data) {
    	res.write(data);
    	res.end();
    });
});

app.get('/:temp/:humi',
 function(req, res){
 	var data = req.params;
 	console.log(data.temp);
 	console.log(data.humi);
 	res.end();
 });

// fs.appendFile('index.txt', '\n<p>' +'next in line'+ '</p>', function(err){  // ghi dữ liệu vào file index.txt
// 	if (err) throw err;
// 	console.log('saved');
// });

