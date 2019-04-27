'use stcit'
const Route = require('./route.js')
const Layer = require('./layer.js')
const methods = require('methods')
const parseUrl = require('parseurl')

const setPrototypeOf = Object.setPrototypeOf
const slice = Array.prototype.slice

const proto = module.exports = function (options) {
  function router (req, res, next) {
    router.handle(req, res, next)
  }
  setPrototypeOf(router, proto)
  router.stack = []
  return router
}

// 3调用handle方法处理请求
proto.handle = function handle (req, res, out) {
  const stack = this.stack
  // console.log('stack:', stack)
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

proto.route = function route (path) {
  const route = new Route(path)
  const layer = new Layer(path, {}, route.dispatch.bind(route))
  layer.route = route
  this.stack.push(layer)
  return route
}

// methods.forEach(function (method) {
//   proto[method] = function (path) {
//       console.log('path:', path)
//     const route = this.route(path)
//     route[method].apply(route, slice.call(arguments, 1))
//     return this
//   }
// })

// get pathname of request
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
