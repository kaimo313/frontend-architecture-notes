const Layer = require("./layer");
const methods = require("methods");

function Route() {
    this.stack = [];
    // 用来描述内部存过哪些方法
    this.methods = {};
}

Route.prototype.dispatch = function (req, res, out) {
    // 稍后调用此方法时，回去栈中拿出对应的 handler 依次执行
    let idx = 0;
    console.log("this.stack----->", this.stack);
    let next = (err) => {
        // 如果内部迭代的时候出现错误，直接到外层的 stack 中
        err && out(err);
        // 遍历完后没有找到就直接走出路由系统
        if (idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        console.log("dispatch----->", layer.method);
        if (layer.method === req.method.toLowerCase()) {
            layer.handle_request(req, res, next);
        } else {
            next();
        }
    };
    next();
};
methods.forEach((method) => {
    Route.prototype[method] = function (handlers) {
        console.log("handlers----->", handlers);
        // 需要判断 handlers 是否是数组
        if (!Array.isArray(handlers)) {
            handlers = [handlers];
        }
        handlers.forEach((handler) => {
            // 这里的路径没有意义
            let layer = new Layer("/", handler);
            layer.method = method;
            // 做个映射表
            this.methods[method] = true;
            this.stack.push(layer);
        });
    };
});

module.exports = Route;
