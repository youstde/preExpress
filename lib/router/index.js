const Route = require('./route')
const Layer = require('./layer')

const parseUrl = require('parseurl')

function Router() {
    this.stack = []
}

Router.prototype.route = function(path) {
    const route = new Route()
    const layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
    return route
}

Router.prototype.handle = function(req, res) {
    const stack = this.stack
    let idx = 0
    const finalHandler = function (req, res) {
      console.log('reach final handler')
    }
    // 循环遍历stack
    next()
    function next () {
      if (idx >= stack.length) {
        return setImmediate(finalHandler, null)
      }
      const path = getPathname(req)
      let layer
      let match
      let route
      while (match !== true && idx < stack.length) {
        layer = stack[idx++]
        // 路由匹配
        match = matchLayer(layer, path)
        route = layer.route
        if (match !== true) {
          continue
        }
        if (!route) {
          continue
        }
        const method = req.method
        const hasMethod = route._handle_method(method)
        if (!hasMethod) {
          continue
        }
      }
      if (match !== true) {
        return finalHandler()
      }
      // 匹配成功后执行layer的handle_request
      return layer.handle_request(req, res, next)
    }
}

function getPathname (req) {
    try {
      return parseUrl(req).pathname
    } catch (err) {
      return undefined
    }
  }
  
  function matchLayer (layer, path) {
    try {
      return layer.match(path)
    } catch (err) {
      return err
    }
  }

module.exports = Router