var http = require('http');
var fs = require('fs');
var socket = require('socket.io');
var ip = require('ip');

var app = http.createServer(function (req, res) {                   // tạo server và gủi file index.txt
    res.writeHead(200, {'Content-Type' : 'text/html'});
    fs.readFile('index.txt', function(err, data) {
    	res.write(data);
    	res.end();
    });
})
var oi = socket(app);                                                //tạo đối tượng web socket
app.listen(8080);                                                    // cho server lắng nghe ở cổng 8080

console.log('listenning at port 8080');
console.log('server run at '+ip.address()+'ip address');             // in địa chỉ ip của server

var webapp = io.of('/webapp')
var esp8266 = io.of('/esp8266')
var middleware = require('socketio-wildcard')();
webapp.use(middleware);
esp8266.use(middleware);

esp8266.on('connection', function(socket){
	console.log('esp8266 connented');
	socket.on('disconnet', function(){
		console.log('esp8266 disconneted!');
	});
	socket.on('*')
});
fs.appendFile('index.txt', '\n<p>' +'next in line'+ '</p>', function(err){  // ghi dữ liệu vào file index.txt
	if (err) throw err;
	console.log('saved');
});

