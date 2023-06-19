function EventEmitter() {
    this._events = {};
}

// 订阅
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events) this._events = {};
    // 如果不是 newListener 那就需要触发 newListener 的回调
    if (eventName !== "newListener") {
        this.emit("newListener", eventName);
    }
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push(callback);
};
// 发布
EventEmitter.prototype.emit = function (eventName, ...args) {
    if (this._events && this._events[eventName]) {
        this._events[eventName].forEach((event) => event(...args));
    }
};
// 注销
EventEmitter.prototype.off = function (eventName, callback) {
    if (this._events && this._events[eventName]) {
        // 这里需要对 once 里的进行处理：删除时获取 once 里的 l 属性和 callback 比较，如果相等也需要删除
        this._events[eventName] = this._events[eventName].filter((cb) => cb != callback && cb.l != callback);
    }
};
// 订阅只执行一次
EventEmitter.prototype.once = function (eventName, callback) {
    // 使用切片
    const once = (...args) => {
        callback(...args);
        this.off(eventName, once);
    };
    // 给 once 添加 l 属性用于表示 callback
    once.l = callback;
    // 先绑定一个一次性事件，稍后触发时在将事件清空
    this.on(eventName, once);
};

module.exports = EventEmitter;
