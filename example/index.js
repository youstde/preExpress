const express = require('../lib/express');
const app = express();

app.get('/mo', function(req, res) {
    console.log('this is two')
    res.end('you send request two throw post');
})

// send GET request
app.get('/home', function(req, res) {
    console.log('this is one')
    res.end('you send request throw get');
})


app.listen(3000, function(){
    console.log('app is listen on 3000')
})