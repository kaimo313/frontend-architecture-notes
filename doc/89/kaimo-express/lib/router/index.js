const Route = require("./route");
const Layer = require("./layer");

function Router() {
    // 维护所有的路由
    this.stack = [];
}

Router.prototype.route = function (path) {
    // 产生 route
    let route = new Route();
    // 产生 layer 让 layer 跟 route 进行关联
    let layer = new Layer(path, route.dispatch.bind(route));
    // 每个路由都具备一个 route 属性，稍后路径匹配到后会调用 route 中的每一层
    layer.route = route;
    // 把 layer 放到路由的栈中
    this.stack.push(layer);
    return route;
};

// 用户调用 get 时，传入的 handler 不一定是一个
Router.prototype.get = function (path, ...handlers) {
    // 1.用户调用 get 时，需要保存成一个 layer 当道栈中
    // 2.产生一个 Route 实例和当前的 layer 创造关系
    // 3.要将 route 的 dispatch 方法存到 layer 上
    let route = this.route(path);
    // 让 route 记录用户传入的 handler 并且标记这个 handler 是什么方法
    route.get(handlers);
};

Router.prototype.handle = function (req, res, next) {};

module.exports = Router;
