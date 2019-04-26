
module.exports = require('./express');

/**
 * 请求的路由校验是在router环节做的
 * 而请求的method校验是在route环节做的
 * router和route都有自己的stack去存储layer实例
 * router的stack存储的都是中间layer，fn都是route的dispatch
 * 而route存储的才是最终路由对应的处理函数
 */