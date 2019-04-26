
function Router() {
    function router() {
    
    }
    Object.setPrototypeOf(router, proto) 
    router.stack = []
    return router
}

var proto = Object.create(null)

proto.handle = function(req, res) {
    var stack = this.stack
    var idx = 0
    next()
    function next() {
        var layer = stack[idx++]
        
    }
}



module.exports = Router