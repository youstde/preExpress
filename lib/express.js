var http = require('http')
var mixin = require('merge-descriptors')
var methods = require('methods')
var Layer = require('./layer')

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
	this.handles = []
}

proto.handle = function(req, res) {
	var handleArr = this.handles
	for(var i= 0; i< handleArr.length; i++) {
		var layer = handleArr[i]
		layer.handle_request(req, res)
	}
}

for(var i= 0; i< methods.length; i++) {
	var method = methods[i]
	proto[method] = function(fn) {
		var layer = new Layer(method, fn)
		this.handles.push(layer)
	}
}

proto.listen = function(port, cb) {
	var server = http.createServer(this)
	return server.listen.apply(server, arguments)
}
