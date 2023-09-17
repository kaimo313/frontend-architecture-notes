const url = require("url");

function Router() {
    // 维护所有的路由
    this.stack = [];
}

Router.prototype.get = function (path, handler) {
    this.stack.push({
        path,
        method: "get",
        handler
    });
};

Router.prototype.handle = function (req, res, next) {
    const { pathname } = url.parse(req.url);
    const requestMethod = req.method.toLowerCase();
    for (let i = 0; i < this.stack.length; i++) {
        let { path, method, handler } = this.stack[i];
        if (path === pathname && method === requestMethod) {
            return handler(req, res);
        }
    }
    // 处理不了的直接走 next
    next();
};

module.exports = Router;
