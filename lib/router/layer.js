function Layer(path, fn) {
    this.handle = fn;
    this.name = fn.name || '<anonymous>';
    this.path = path;
}


//简单处理
Layer.prototype.handle_request = function (req, res) {
    console.log(2)
  var fn = this.handle;

  if(fn) {
      fn(req, res);
  }
};


//简单匹配
Layer.prototype.match = function (path) {
    if(path === this.path || path === '*') {
        return true;
    }
    
    return false;
};


exports = module.exports = Layer;