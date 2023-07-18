const EventEmitter = require("events");
const fs = require("fs");
let LinkedList = require("./LinkedList");

class Queue {
    constructor() {
        this.LinkedList = new LinkedList();
    }
    offer(element) {
        this.LinkedList.add(element);
    }
    poll() {
        return this.LinkedList.remove(0);
    }
}

class KaimoWriteStream extends EventEmitter {
    constructor(path, opts = {}) {
        super();
        this.path = path;
        this.flags = opts.flags || "w";
        this.autoClose = opts.autoClose || true;
        this.encoding = opts.encoding || "utf8";
        this.start = opts.start || 0;
        this.mode = opts.mode || 0o666;
        this.highWaterMark = opts.highWaterMark || 16 * 1024;

        // 维护当前存入的数据个数
        // 每次调用 write 方法，会根据写入的内容的个数累加给 len 属性（缓存的长度）
        this.len = 0;
        // 是否正在写入
        this.writing = false;
        // 是否需要触发 drain 事件
        this.needDrain = false;
        // 写入的偏移量
        this.offset = this.start;
        // 用来缓存的队列
        this.cache = new Queue();
        // 默认先打开文件
        this.open();
    }
    // open 方法是异步的
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                return this.emit("error", err);
            }
            // 将 fd 保存到实例上，用于稍后的读取操作
            this.fd = fd;
            this.emit("open", fd);
        });
    }
    write(chunk, encoding = "utf8", cb = () => {}) {
        // 统一转为 buffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        // write 方法的返回值
        let flag = this.len < this.highWaterMark;
        // drain 事件的触发：1.必须写入的个数达到预期或者超过预期
        this.needDrain = !flag;
        if (this.writing) {
            // 正在写入
            this.cache.offer({
                chunk,
                encoding,
                cb
            });
        } else {
            // 没有正在写入
            this.writing = true; // 标识正在写入了
            // 真正写入的逻辑
            this._write(chunk, encoding, () => {
                // 原来用户传入的 callback
                cb();
                // 当前内容写入完毕后清空缓存区中的内容
                this.clearBuffer();
            });
        }
        return flag;
    }
    _write(chunk, encoding, cb) {
        // 写入必须要等待文件打开完毕，如果打开了会触发 open 事件
        if (typeof this.fd !== "number") {
            // 如果没有 fd 就返回一个 open 的一次性事件，再去回调 _write 方法
            return this.once("open", () => this._write(chunk, encoding, cb));
        }
        // 将用户数据写入到文件中
        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            if (err) {
                return this.emit("error", err);
            }
            this.len -= written; // 缓存中的数量要减少
            this.offset += written;
            console.log("chunk--->", chunk.toString());
            cb(); // 当前文件内容写入完毕后，再去清空缓存中的
        });
    }
    clearBuffer() {
        let data = this.cache.poll();
        if (data) {
            // 需要缓存
            let { chunk, encoding, cb } = data;
            this._write(chunk, encoding, () => {
                cb();
                // 当前缓存的第一个执行后，再去清空第二个
                this.clearBuffer();
            });
        } else {
            this.writing = false;
            if (this.needDrain) {
                // 当前触发后下次就不需要再次触发了
                this.needDrain = false;
                this.emit("drain");
            }
        }
    }
}

module.exports = KaimoWriteStream;
