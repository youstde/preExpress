var Layer = require('./layer.js'),
	Route = require('./route.js');

var Router = function() {
	this.stack = [new Layer('*', function(req, res) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end('404');		
	})];
};


Router.prototype.handle = function(req, res) {
	console.log(1)
	var self = this,
	    method = req.method;

	for(var i=0,len=self.stack.length; i<len; i++) {
		console.log('handleMethod====>', self.stack[i].route)
	    if(self.stack[i].match(req.url) && 
	        self.stack[i].route && self.stack[i].route._handles_method(method)) {
				
	        return self.stack[i].handle_request(req, res);
	    }
	}


	return self.stack[0].handle_request(req, res);
};


Router.prototype.route = function route(path, method) {
    var route = new Route(path);

    var layer = new Layer(path, function(req, res) {
		console.log(3)
        route.dispatch(req, res);
    });

	layer.route = route;
	layer.method = method;

    this.stack.push(layer);

    return route;
};


Router.prototype.get = function(path, fn) {
	var route = this.route(path, 'get');
    route.get(fn);

    return this;
};

Router.prototype.post = function(path, fn) {
	var route = this.route(path, 'post');
	console.log('post===>', this.stack)
    route.post(fn);

    return this;
};


exports = module.exports = Router;