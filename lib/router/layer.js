
function Layer (method, fn) {
    this.method = method
    this.handle = fn
}

Layer.prototype.handle_method = function(req) {
    return this.method === req.method.toLowerCase()
}

Layer.prototype.handle_request = function(req, res, next) {
    // 将判断放在每个layer中，从而将这些代码从express中抽离到layer中去处理
    if(!this.handle_method(req)) return
    var fn = this.handle
    try {
        fn(req, res, next)
    } catch(err) {
        console.log(err)
    }
}

module.exports = Layer