const proto = {
    // get url() {
    //     console.log(this.__proto__.__proto__ === proto);
    //     return this.request.url;
    // },
    // get path() {
    //     return this.request.path;
    // }
};
// 上面一个一个写比较麻烦，可以使用 __defineGetter__ 去实现代理
function defineGetter(target, key) {
    proto.__defineGetter__(key, function () {
        return this[target][key];
    });
}

function defineSetter(target, key) {
    proto.__defineSetter__(key, function (value) {
        this[target][key] = value;
    });
}

defineGetter("request", "url"); // ctx.url => ctx.request.url
defineGetter("request", "path"); // ctx.path => ctx.request.path
defineGetter("request", "query"); // ctx.query => ctx.request.query

defineGetter("response", "body"); // ctx.body => ctx.response.body
defineSetter("response", "body"); // ctx.body => ctx.response.body

module.exports = proto;
