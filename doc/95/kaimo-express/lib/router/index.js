const url = require("url");
const Route = require("./route");
const Layer = require("./layer");
const methods = require("methods");

function Router() {
    // 创建路由系统
    let router = (req, res, next) => {
        // 二级路由
        // 让对应的路由系统去进行匹配操作
        router.handle(req, res, next);
    };
    // 兼容老的路由写法
    // 维护所有的路由
    router.stack = [];
    // router 链上得有 get 等方法
    // 让路由的实例可以通过链找到原来的方法
    router.__proto__ = proto;
    return router;
}

let proto = {};

proto.route = function (path) {
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
    proto[method] = function (path, handlers) {
        // 1.用户调用 method 时，需要保存成一个 layer 当道栈中
        // 2.产生一个 Route 实例和当前的 layer 创造关系
        // 3.要将 route 的 dispatch 方法存到 layer 上
        let route = this.route(path);
        // 让 route 记录用户传入的 handler 并且标记这个 handler 是什么方法
        route[method](handlers);
    };
});

proto.use = function (path, ...handlers) {
    // 默认第一个是路径，后面是一个个的方法，路径可以不传
    if (typeof path === "function") {
        handlers.unshift(path);
        path = "/";
    }
    // 如果是多个函数需要循环添加层
    for (let i = 0; i < handlers.length; i++) {
        let layer = new Layer(path, handlers[i]);
        // 中间件不需要 route 属性
        layer.route = undefined;
        this.stack.push(layer);
    }
};

proto.handle = function (req, res, out) {
    console.log("请求到了");
    // 需要取出路由系统中 Router 存放的 layer 依次执行
    let { pathname } = url.parse(req.url);
    let idx = 0;
    let removed = "";
    let next = (err) => {
        // 遍历完后没有找到就直接走出路由系统
        if (idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        // 中间件出来需要加上 removed，继续往下匹配
        if (removed) {
            req.url = removed + pathname; // 匹配其他中间件
            removed = "";
        }
        if (err) {
            console.log("统一对中间件跟路由错误处理");
            // 找错误处理中间件
            if (!layer.route) {
                // 如果是中间件自己处理
                layer.handle_error(err, req, res, next);
            } else {
                // 路由则跳过，继续携带错误向下执行
                next(err);
            }
        } else {
            // 需要判断 layer 上的 path 和当前请求路由是否一致，一致就执行 dispatch 方法
            if (layer.match(pathname)) {
                // 中间件没有方法可以匹配，不能是错误处理中间件
                if (!layer.route) {
                    if (layer.handler.length !== 4) {
                        // 中间件进去匹配需要删除 path，存起来出去时用
                        // 比如我们访问 /user/add，那么需要删除 /user，用 /add 去匹配用户里的路由是否有 /add
                        if (layer.path !== "/") {
                            removed = layer.path;
                            req.url = pathname.slice(removed.length);
                        }
                        layer.handle_request(req, res, next);
                    } else {
                        // 错误中间件
                        next();
                    }
                } else {
                    // 将遍历路由系统中下一层的方法传入
                    // 加速匹配，如果用户注册过这个类型的方法在去执行
                    if (layer.route.methods[req.method.toLowerCase()]) {
                        layer.handle_request(req, res, next);
                    } else {
                        next();
                    }
                }
            } else {
                next();
            }
        }
    };
    next();
};

module.exports = Router;
