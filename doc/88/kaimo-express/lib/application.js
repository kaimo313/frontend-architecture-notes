const http = require("http");
const Router = require("./router");

function Application() {
    this._router = new Router();
}

Application.prototype.get = function (path, handler) {
    this._router.get(path, handler);
};

Application.prototype.listen = function () {
    const server = http.createServer((req, res) => {
        function next() {
            res.end(`kaimo-express Cannot ${req.method} ${req.url}`);
        }
        this._router.handle(req, res, next);
    });
    server.listen(...arguments);
};

module.exports = Application;
