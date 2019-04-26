var http = require('http')
var mixin = require('merge-descriptors')
var methods = require('methods')
var Router = require('./router')

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
	
}

proto.handle = function(req, res) {
	var router = this._router
	router.handle(req, res)
}

// 如果用户没有使用路由，则无需挂载_router
proto.lazy_router = function() {
	if(!this._router) {
		this._router = new Router({})
	}
}

methods.forEach(function(method) {
	proto[method] = function(path, fn) {
		this.lazy_router()
		var route = this._router.route(path)
		// slice.call(arguments, 1)的返回值是一个数组，就是传入的fn
		route[method].apply(route, slice.call(arguments, 1))
		return this
	}
})

proto.listen = function(port, cb) {
	var server = http.createServer(this)
	return server.listen.apply(server, arguments)
}
