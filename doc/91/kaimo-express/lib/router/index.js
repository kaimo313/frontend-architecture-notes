const url = require("url");
const Route = require("./route");
const Layer = require("./layer");
const methods = require("methods");

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

methods.forEach((method) => {
    Router.prototype[method] = function (path, handlers) {
        // 1.用户调用 method 时，需要保存成一个 layer 当道栈中
        // 2.产生一个 Route 实例和当前的 layer 创造关系
        // 3.要将 route 的 dispatch 方法存到 layer 上
        let route = this.route(path);
        // 让 route 记录用户传入的 handler 并且标记这个 handler 是什么方法
        route[method](handlers);
    };
});

Router.prototype.handle = function (req, res, out) {
    console.log("请求到了");
    // 需要取出路由系统中 Router 存放的 layer 依次执行
    const { pathname } = url.parse(req.url);
    let idx = 0;
    let next = () => {
        // 遍历完后没有找到就直接走出路由系统
        if (idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        // 需要判断 layer 上的 path 和当前请求路由是否一致，一致就执行 dispatch 方法
        if (layer.match(pathname)) {
            // 将遍历路由系统中下一层的方法传入
            // 加速匹配，如果用户注册过这个类型的方法在去执行
            if (layer.route.methods[req.method.toLowerCase()]) {
                layer.handle_request(req, res, next);
            } else {
                next();
            }
        } else {
            next();
        }
    };
    next();
};

module.exports = Router;
