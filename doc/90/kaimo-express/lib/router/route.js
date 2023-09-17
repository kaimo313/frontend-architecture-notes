const Layer = require("./layer");

function Route() {
    this.stack = [];
}

Route.prototype.dispatch = function (req, res, out) {
    // 稍后调用此方法时，回去栈中拿出对应的 handler 依次执行
    let idx = 0;
    console.log("this.stack----->", this.stack);
    let next = () => {
        // 遍历完后没有找到就直接走出路由系统
        if (idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        if (layer.method === req.method.toLowerCase()) {
            layer.handler(req, res, next);
        } else {
            next();
        }
    };
    next();
};

Route.prototype.get = function (handlers) {
    console.log("handlers----->", handlers);
    handlers.forEach((handler) => {
        // 这里的路径没有意义
        let layer = new Layer("/", handler);
        layer.method = "get";
        this.stack.push(layer);
    });
};

module.exports = Route;
