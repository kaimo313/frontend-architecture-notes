const http = require("http");
const Router = require("./router");
const methods = require("methods");
console.log("methods----->", methods);

function Application() {}

// 调用此方法才开始创建，不是创建应用时直接装载路由
Application.prototype.lazy_route = function () {
    if (!this._router) {
        this._router = new Router();
    }
};

methods.forEach((method) => {
    Application.prototype[method] = function (path, ...handlers) {
        this.lazy_route();
        this._router[method](path, handlers);
    };
});

Application.prototype.use = function () {
    this.lazy_route();
    this._router.use(...arguments);
};

Application.prototype.listen = function () {
    const server = http.createServer((req, res) => {
        function done() {
            res.end(`kaimo-express Cannot ${req.method} ${req.url}`);
        }
        this.lazy_route();
        this._router.handle(req, res, done);
    });
    server.listen(...arguments);
};

module.exports = Application;
