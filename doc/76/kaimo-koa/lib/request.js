const url = require("url");
const request = {
    // 属性访问器的方式 ctx.request.url 就会执行 url()
    get url() {
        // this 就是 ctx.request
        return this.req.url;
    },
    get path() {
        return url.parse(this.req.url).pathname;
    },
    get query() {
        return url.parse(this.req.url).query;
    }
    // ... 可以自己添加其他的扩展属性
};

module.exports = request;
