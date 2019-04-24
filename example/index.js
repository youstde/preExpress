const express = require('../lib/express');
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

app.listen(3000, function(){
    console.log('app is listen on 3000')
})