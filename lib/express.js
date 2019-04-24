var http = require('http')
var mixin = require('merge-descriptors')

module.exports = function() {
	var app = function(req, res) {
		res.end('this is server throw express')
	}
	mixin(app, proto, false)
	return app
}

// 创建原型，拓展方法
var proto = Object.create(null)
proto.listen = function(port, cb) {
	var server = http.createServer(this)
	return server.listen.apply(server, arguments)
}