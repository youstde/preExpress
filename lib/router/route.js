var methods = require('methods')
var flatten = require('array-flatten')
var Layer = require('./layer')

var slice = Array.prototype.slice

function Route() {
    this.stack = []
    this.methods = {}
}

Route.prototype.handle_method = function(method) {
    var name = method.toLowerCase()
    return Boolean(this.methods[name])
}

Route.prototype.dispatch = function(req, res) {
    var method = req.method.toLowerCase()
    var stack = this.stack
    var idx = 0
    next()
    function next() {
        var layer = stack[idx++]
        if(layer.method && layer.method !== method) {
            return next()
        }
        layer.handle_request(req, res, next)
    }
}


methods.forEach(function(method) {
    Route.prototype[method] = function() {
        console.log('method:', method)
        // 将arguments伪数组变成数组同时拍平整个数组
        var handles = flatten(slice.call(arguments))
        for(var j= 0; j< handles.length; j++) {
            var handle = handles[j]
            var layer = new Layer(method, handle)
            this.stack.push(layer)
            this.methods[method] = true
        }
    }
})


module.exports = Route