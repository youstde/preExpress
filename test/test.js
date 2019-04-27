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
// console.log(errTest.length)

// 将伪数组变成数组
function argumentTest() {
    var slice = Array.prototype.slice
    
    console.log(slice.call(arguments))
}
// argumentTest(1,2)

// 将路径变成正则
const pathToRegexp = require('path-to-regexp')

const keys = []
const regexp = pathToRegexp('/foo/:bar', keys)
// console.log(regexp.exec('/foo/xixi?test=123'))
// console.log(keys)

let d = {sex: 'woman', job: 'IT'};
Object.defineProperties(d, {
    sex: {
        get(){
            return 'man'
        }
    }
})

let e = {sex: '123'};
let f = mixin(e, d, true);
// console.log(f.sex);//123


var far = {
    name: 'jack'
}
var proto = Object.create(null)
proto.age = 28;
proto.getName = function() {
    return this.name;
}
var obj = Object.setPrototypeOf(far, proto);
// 等同于
// var obj = {__proto__: proto};
console.log(obj)