const express = require('../lib/index');
const app = express();
// var router = express.Router();

// app.get('/mo', function(req, res) {
//     console.log('this is two')
//     res.end('you send request two throw post');
// })

// send GET request
// app.get('/home', function(req, res) {
//     console.log('this is one')
//     res.end('you send request throw get');
// })

// router.use('/2', function(req, res, next) {
// 	res.send('second user');
// });

// app.use('/users', router);



app.get(function(req, res, next) {
    console.log('this is before next')
    next()
}, function(req, res, next) {
    res.end('get request response')
})

app.listen(3000, function(){
    console.log('app is listen on 3000')
})