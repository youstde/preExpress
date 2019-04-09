const http = require('http');

http.createServer(function(req, res) {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Welcome to the homepage!");
    } else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Welcome to the aboutpage!");
    }
      
}).listen(3000, 'localhost');

