// simple_server2.js                                                          -+-JS-+-

// Here, we declare modules to be loaded by the server
// express is a 3rd party application framework for building nodeJs applications
// server is an http server, which uses app as the response handler
// io is another 3rd party framework for sending messages back and forth to/from the client
// fs is a nodeJs built in package for working with the filesystem
var express = require('express'),
    app     = express(),
    server  = require("http").createServer(app),
    io      = require('socket.io')(server),
    fs      = require("fs");

// This line tells the app framework to search the path ./simple2/ when looking at relative paths
app.use(express.static(__dirname + '/simple2/'));

// This line tells the app framework that when navigating to localhost:8080/, use this response function
app.get('/', function(req, res){
    // Read the simpleui2.html file. Once the file is read, call the function
    fs.readFile('simple2/simpleui2.html',
        function (err, contents) {
            // If we have an error, then send back a 500 server error and write a short message.
            if (err) {
                res.writeHead(500);
                return res.end('Error loading simpleui2.html');
            }
            // If we were successful, tell the browser it's html and send it forward.
            res.writeHead(200, {'Content Type': 'text/html'});
            res.end(contents);
    });
    
});

// tell the server to listen on the port 8080
server.listen(8080);

// When the client side script connects a socket, call the function
io.on('connection', function (socket) {
    // Set up two event handlers for messages from the client
    // On button clicks, send a result event to the client with a short message
    socket.on('button_click', function (data) {
        socket.emit('result', {result : 'You clicked on ' + data.id})
    });
    
    // On input events, depending on the id of the input, send back two different messages
    socket.on('input_change', function (data) {
        var str = "You typed " + data.newvalue + ".";
        if (data.oldvalue) {
            str += " You deleted " + data.oldvalue + " to type it.";
        }
      
        // If it was the second input, we'll reverse the message
        if (data.id == "input2") {
            socket.emit('result', {result : str.split("").reverse().join("")})
        }
        // otherwise we send it back plain.
        else {
            socket.emit('result', {result : str})
        }
    });
});