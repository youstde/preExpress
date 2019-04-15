var http = require('http');

var router = [
    {
        path: '*',
        method: '*',
        handle: function(req, res) {
            // 路由匹配成功后执行
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('this is * router')
        }
    }
]

exports = module.exports = {
    get: function(path, fn) {
        // 将路由收集到router中
        router.push({
            path,
            method: 'GET',
            handle: fn
        })
    },
    listen: function(port, cb) {
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
            for(var i= 0; i< router.length; i++) {
                if(req.url === router[i].path && req.method === router[i].method) {
                    return router[i].handle(req, res) && router[i].handle(req, res)
                }
            }
            return router[0].handle(req, res) && router[0].handle(req, res)
        });
       return server.listen.apply(server, arguments);
    }
}