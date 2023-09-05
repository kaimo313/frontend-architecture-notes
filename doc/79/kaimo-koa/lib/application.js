const EventEmitter = require("events");
const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");
const Stream = require("stream");

console.log("kaimo-koa---->");

class Application extends EventEmitter {
    constructor() {
        super();
        // 防止多个实例共享 context request response 需要进行拷贝
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        // 储存用户所有的 callback
        this.middlewares = [];
    }
    use(callback) {
        // 将用户传递的 callback 全部组合起来
        this.middlewares.push(callback);
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
    compose(ctx) {
        // 在数组中取出第一个，第一个执行后执行第二个
        const dispatch = (i) => {
            if (i === this.middlewares.length) return Promise.resolve();
            let middleware = this.middlewares[i];
            // 中间件如果不是 async 需要 Promise 包装一下，() => dispatch(i + 1) 就是 next
            return Promise.resolve(middleware(ctx, () => dispatch(i + 1)));
        };
        return dispatch(0);
    }
    async handleRequest(req, res) {
        const ctx = this.createContext(req, res);
        // 组合成一个线性结构依次执行，组合完返回一个大的 promise
        await this.compose(ctx);
        // 当组合后的 promise 完成后，拿到最终的结果响应回去
        let body = ctx.body;
        // 判断是否是 string 或者 buffer 、流、对象
        if (typeof body === "string" || Buffer.isBuffer(body)) {
            res.end(body);
        } else if (body instanceof Stream) {
            // 添加下载头
            res.setHeader("Content-Disposition", `attachment;filename=${encodeURIComponent("凯小默下载")}`);
            body.pipe(res);
        } else if (typeof body === "object") {
            res.end(JSON.stringify(body));
        }
    }
    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
}

module.exports = Application;
