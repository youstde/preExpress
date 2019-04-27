const methods = require('methods')
const flatten = require('array-flatten')
const Layer =require('./layer')

const slice = Array.prototype.slice

function Route () {
    this.stack = []
    this.methods = {}
}

Route.prototype._handle_method = function (method) {
    const name = method.toLowerCase()
    return Boolean(this.methods[name])
  }

// 在layer中以fn的形式执行
Route.prototype.dispatch = function(req, res, done) {
    // done为router中的next
    const method = req.method.toLowerCase()
    const stack = this.stack
    if (stack.length === 0) {
        return done()
    }
    let idx = 0
    // 循环遍历stack
    next()
    function next () {
        const layer = stack[idx++]
        if (!layer) {
        return done()
        }
        // method匹配
        if (layer.method && layer.method !== method) {
        return next()
        }
        // 匹配成功后执行layer的handle_request
        layer.handle_request(req, res, next)
    }
}

// 用来收集路由对应的处理函数的
methods.forEach(function(method) {
    Route.prototype[method] = function() {
        const handles = flatten(slice.call(arguments))
        for(var i= 0; i< handles.length; i++) {
            const layer = new Layer('/', handles[i])
            layer.method = method
            this.methods[method] = true
            this.stack.push(layer)
        }
    }
})

module.exports = Route
