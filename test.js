// 继承
const mixin = require('merge-descriptors');
var ting = {
    get name() {
        return 'st'
    }
}

var other = {};

mixin(other, ting);
console.log(other.name);