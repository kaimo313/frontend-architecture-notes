function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
}

Layer.prototype.match = function (pathname) {
    if (this.path === pathname) {
        return true;
    }
    // 如果是中间件，进行中间件的匹配规则
    if (!this.route) {
        if (this.path == "/") {
            return true;
        }
        // /aaaa/b 需要 /aaaa/ 才能匹配上
        return pathname.startsWith(this.path + "/");
    }
    return false;
};
Layer.prototype.handle_request = function (req, res, next) {
    this.handler(req, res, next);
};
module.exports = Layer;
