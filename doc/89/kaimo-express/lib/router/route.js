const Layer = require("./layer");

function Route() {
    this.stack = [];
}

Route.prototype.dispatch = function () {
    // 稍后调用此方法时，回去栈中拿出对应的 handler 依次执行
};

Route.prototype.get = function (handlers) {
    handlers.forEach((handler) => {
        // 这里的路径没有意义
        let layer = new Layer("/", handler);
        layer.method = "get";
        this.stack.push(layer);
    });
};

module.exports = Route;
