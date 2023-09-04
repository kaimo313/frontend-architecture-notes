const EventEmitter = require("events");
const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

console.log("kaimo-koa---->");

class Application extends EventEmitter {
    constructor() {
        super();
        // 防止多个实例共享 context request response 需要进行拷贝
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    use(callback) {
        this.callback = callback;
    }
    // 创建一个上下文
    createContext(req, res) {
        // 每次请求都应该是一个全新的 context，需要拷贝
        let ctx = Object.create(this.context);
        // 上下文中有一个 request 对象，是自己封装的
        ctx.request = Object.create(this.request);
        // 上下文中还有一个 req 属性 指代的是原生的 req，自己封装的 request 对象上有 req 属性
        ctx.req = ctx.request.req = req;
        // 上下文中还有一个 response 对象，是自己封装的
        ctx.response = Object.create(this.response);
        // 上下文中还有一个 res 属性 指代的是原生的 res，自己封装的 response 对象上有 res 属性
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    handleRequest(req, res) {
        const ctx = this.createContext(req, res);
        this.callback(ctx);
    }
    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
}

module.exports = Application;
