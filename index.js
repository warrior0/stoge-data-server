var PORT = 80;
var http = require('http');
var fs = require('fs');
var ip = require('ip');
var url = require('url');
var express = require('express');

var app = express();

var server = http.Server(app);
server.listen(process.env.PORT || PORT, function(){
	console.log('listenning at port 80');	                          		// cho server lắng nghe ở cổng 8080
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
 	var day = new Date();
	var hours = day.getHours();
	var minutes = day.getMinutes();
	var seconds = day.getSeconds();
	var time = hours + '-' + minutes + '-' + seconds+' ' + day;
 	console.log(time);
 	fs.appendFile('index.txt', '\n' + ' temperature: ' + data.temp + '\thuminity: ' + data.humi + '  --  ' + time,
 	 function(err){                                           // ghi dữ liệu vào file index.txt
	if (err) throw err;
	console.log('saved');
});

 	res.end();
 });


