var express = require('express'),
    app     = express(),
    server  = require("http").createServer(app),
    io      = require('socket.io')(server),
    fs      = require("fs");

app.use(express.static(__dirname + '/simple2/'));
app.get('/', function(req, res){
    fs.readFile('simple2/simpleui2.html',
        function (err, contents) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading simpleui2.html');
            }
            //contents = contents.toString('utf8');
            res.writeHead(200, {'Content Type': 'text/html'});
            res.end(contents);
    });
    
});

server.listen(8080);

io.on('connection', function (socket) {
    socket.on('button_click', function (data) {
        socket.emit('result', {result : 'You clicked on ' + data.id})
    });
    socket.on('input_change', function (data) {
        if (data.id == "input2") {
            var str = "You typed " + data.value;
            socket.emit('result', {result : str.split("").reverse().join("")})
        }
        else {
            socket.emit('result', {result : 'You typed ' + data.value})
        }
    });
});