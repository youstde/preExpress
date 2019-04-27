const http = require('http')
const methods = require('methods')
const mixin = require('merge-descriptors')

const Router = require('./router/index.js')
const slice = Array.prototype.slice

module.exports = function() {
    const app = function(req, res) {
        app.handle(req, res)
    }
    mixin(app, proto, false)
    return app
}

const proto = Object.create(null)

proto.listen = function() {
    const server = http.createServer(this)
    return server.listen.apply(server, slice.call(arguments))
}

proto.lazy_router = function() {
    if(!this._router) {
        this._router = new Router()
    }
}

proto.handle = function(req ,res) {
    this._router.handle(req, res)
}

methods.forEach(function(method) {
    proto[method] = function(path) {
        this.lazy_router()
        const route = this._router.route(path)
        route[method].apply(route, slice.call(arguments, 1))
        return this
    }
})
