var http = require('http');
var Router = require('./router/route')

exports = module.exports = {
    _router: new Router(),
    get: function(path, fn) {
        // 将路由收集到router中
        this._router.stack.push({
            path,
            method: 'GET',
            handle: fn
        })
    },
    listen: function(port, cb) {
        var self = this;
        var server = http.createServer(function(req, res) {
            console.log(req.url, req.method)
            // 如果res.send不存在,就给res添加一个send
            if(!res.send) {
                res.send = function(body) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(body)
                }
            }
            self._router.handle(req, res)
        });
       return server.listen.apply(server, arguments);
    }
}