const http = require("http");
const url = require("url");
const routers = [
    {
        path: "*",
        method: "all",
        handler: (req, res) => {
            res.end(`kaimo-express Cannot ${req.method} ${req.url}`);
        }
    } // 默认路由
];

function createApplication() {
    return {
        get(path, handler) {
            routers.push({
                path,
                method: "get",
                handler
            });
        },
        listen() {
            const server = http.createServer((req, res) => {
                const { pathname } = url.parse(req.url);
                const requestMethod = req.method.toLowerCase();
                for (let i = 1; i < routers.length; i++) {
                    let { path, method, handler } = routers[i];
                    if (path === pathname && method === requestMethod) {
                        return handler(req, res);
                    }
                }
                return routers[0].handler(req, res);
            });
            server.listen(...arguments);
        }
    };
}

module.exports = createApplication;
