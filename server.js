var jade = require('jade');
var express = require('express')
var app = express();
var fs = require('fs');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.render('home.jade');
});
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('message', function (message) {
	if (message != "") {
        fs.appendFile('chat.txt', '<div class="message"><p> Anonymous: ' + message +  ' </p></div>', function (err) {
	    if (err) throw err;
	});}
        fs.readFile('chat.txt', {encoding: 'utf-8'}, function (err, data) {
	    if (err) throw err;
	    socket.emit('receive', data);
	});
    });
});