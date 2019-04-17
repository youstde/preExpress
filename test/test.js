// 继承模块测试
const mixin = require('merge-descriptors');
var ting = {
    get name() {
        return 'st'
    }
}

var other = {};

// mixin(other, ting);
// console.log(other.name);

function errTest(err) {
    new Error('error')
    if(err) {
        console.log('err:', err)
    }
}
// 参数个数
console.log(errTest.length)