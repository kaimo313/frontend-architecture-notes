const EventEmitter = require("events");
const fs = require("fs");

class KaimoReadStream extends EventEmitter {
    constructor(path, opts = {}) {
        super();
        this.path = path;
        this.flags = opts.flags || "r";
        this.mode = opts.mode || 0o666;
        this.autoClose = opts.autoClose || true;
        this.start = opts.start || 0;
        this.end = opts.end || 0o666;
        // 读取的数量默认是 64k
        this.highWaterMark = opts.highWaterMark || 64 * 1024;
        // 记录读取的偏移量
        this.pos = this.start;
        // 默认创建一个可读流，是非流动模式，不会触发 data 事件，如果用户监听了 data 事件后，需要变为流动模式
        // 是否是流动模式
        this.flowing = false;
        this.on("newListener", (type) => {
            // 如果用户监听了 data
            if (type === "data") {
                this.flowing = true;
                this.read();
            }
        });
        // 打开文件
        this.open();
    }
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
    // 利用发布订阅来实现延迟执行
    read() {
        // 读取必须要等待文件打开完毕，如果打开了会触发 open 事件
        if (typeof this.fd !== "number") {
            // 如果没有 fd 就返回一个 open 的一次性事件，再去回调 read 方法
            return this.once("open", () => this.read());
        }
        console.log("KaimoReadStream---->", this.fd);
        // 真正开始读取
        const buffer = Buffer.alloc(this.highWaterMark);
        // 每次理论上应该读取 highWaterMark 个，但是用户能指定读取的位置
        // 应该读几个（不要读超了）
        let howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;
        fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (bytesRead) {
                this.pos += bytesRead;
                this.emit("data", buffer.slice(0, bytesRead));
                if (this.flowing) {
                    this.read();
                }
            } else {
                this.emit("end");
                if (this.autoClose) {
                    fs.close(this.fd, () => {
                        this.emit("close");
                    });
                }
            }
        });
    }
    pause() {
        this.flowing = false;
    }
    resume() {
        this.flowing = true;
        this.read();
    }
}

module.exports = KaimoReadStream;
