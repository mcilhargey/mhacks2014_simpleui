// simple_server.js                                                          -+-JS-+-

// Here, we declare modules to be loaded by the server
// http is a nodejs built in module that allows us to setup a server
var http = require("http");


// This declares a function for processing requests to the webserver
// req represents the request, while res is our response
function process_request(req, res) {
    // Here we make a simple response, a page that says thanls
    var body = 'Thanks for calling!\n';
    var content_length = body.length;
    // Here, we set the return code, and the size and type of the content.
    res.writeHead(200, {
                  'Content Length': content_length,
                  'Content Type': 'text/plain'
                  });
    // This line writes the body into the response, and sends it
    res.end(body);
}

// Here, we create the server, telling it to use process_request as the handler
var s = http.createServer(process_request);

// Now we tell the server to enter a loop, listening to port 8080 for requests.
s.listen(8080);
