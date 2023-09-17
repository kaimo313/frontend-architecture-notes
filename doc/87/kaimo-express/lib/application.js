const http = require("http");
const url = require("url");

function Application() {
    this.routers = [
        {
            path: "*",
            method: "all",
            handler: (req, res) => {
                res.end(`kaimo-express Cannot ${req.method} ${req.url}`);
            }
        } // 默认路由
    ];
}

Application.prototype.get = function (path, handler) {
    this.routers.push({
        path,
        method: "get",
        handler
    });
};

Application.prototype.listen = function () {
    const server = http.createServer((req, res) => {
        const { pathname } = url.parse(req.url);
        const requestMethod = req.method.toLowerCase();
        for (let i = 1; i < this.routers.length; i++) {
            let { path, method, handler } = this.routers[i];
            if (path === pathname && method === requestMethod) {
                return handler(req, res);
            }
        }
        return this.routers[0].handler(req, res);
    });
    server.listen(...arguments);
};

module.exports = Application;
