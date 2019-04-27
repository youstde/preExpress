const pathRegexp = require('path-to-regexp')

function Layer (path, fn) {
    this.path = path
    this.handle = fn
    this.name = fn.name || '<anonymous>'
    this.regexp = pathRegexp(path, this.keys = [])
    this.regexp.fast_star = path === '*'
    this.regexp.fast_slash = path === '/'
}

Layer.prototype.handle_request = function handleRequest (req, res, next) {
    // 执行route.dispatch
    const fn = this.handle
    try {
      fn(req, res, next)
    } catch (err) {
      throw err
    }
  }

  Layer.prototype.match = function match (path) {
    if (path != null) {
      if (this.regexp.fast_slash) {
        return true
      }
      if (this.regexp.fast_star) {
        return true
      }
      const match = this.regexp.exec(path)
      return Boolean(match)
    }
  }

module.exports = Layer