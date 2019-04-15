const express = require('../lib/express');
const app = express();

// send GET request
app.get('/home', function(req, res) {
    res.end('you send request throw get');
})

app.listen(3000, function(){
    console.log('app is listen on 3000')
})