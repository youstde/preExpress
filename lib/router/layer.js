var http = require('http');
var Router = function() {
    this.stack = [
        {
            path: '*',
            method: '*',
            handle: function(req, res) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end('this is default route')
            }
        }
    ]
}

Router.prototype.get = function(path, fn) {
    this.stack.push({
        path,
        method: 'GET',
        handle: fn
    })
}

Router.prototype.handle = function(req, res) {
    for(var i= 0; i< this.stack.length; i++) {
        if(req.url === this.stack[i].path && req.method === this.stack[i].method) {
            return this.stack[i].handle && this.stack[i].handle(req, res)
        }
    }
    return this.stack[0].handle && this.stack[0].handle(req, res)
}

exports = module.exports = Router;