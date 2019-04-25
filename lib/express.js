var http = require('http')
var mixin = require('merge-descriptors')
var methods = require('methods')
var Route = require('./router/route')

var slice = Array.prototype.slice

module.exports = function() {
	var app = function(req, res) {
		app.handle(req, res)
	}
	mixin(app, proto, false)
	// 初始化
	app.init()
	return app
}

// 创建原型，拓展方法
var proto = Object.create(null)

proto.init = function() {
	this.route = new Route()
}

proto.handle = function(req, res) {
	this.route.dispatch.apply(this.route, slice.call(arguments))
}

methods.forEach(function(method) {
	proto[method] = function() {
		this.route[method].apply(this.route, slice.call(arguments))
	}
})

proto.listen = function(port, cb) {
	var server = http.createServer(this)
	return server.listen.apply(server, arguments)
}
