var http = require('http')
var mixin = require('merge-descriptors')

exports = module.exports = function createServer() {
    const app = function(req, res) {
        res.end('server success')
    }
    mixin(app, proto, false)
    return app
}

const proto = Object.create(null)

proto.listen = function(port, cb) {
    const server = http.createServer(this)
    return server.listen.apply(server, arguments)
}