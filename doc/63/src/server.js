// 核心模块
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs").promises;
const { createReadStream, createWriteStream } = require("fs");

// 第三方模块
const ejs = require("ejs"); // 服务端读取目录进行渲染
const mime = require("mime");
const chalk = require("chalk");
const debug = require("debug")("server");
// 根据环境变量来进行打印 process.env.EDBUG
debug("hello kaimo-http-server");

class Server {
    constructor(config) {
        this.host = config.host;
        this.port = config.port;
        this.directory = config.directory;
    }
    async handleRequest(req, res) {
        let { pathname } = url.parse(req.url);
        // 通过路径找到这个文件返回
        const filePath = path.join(this.directory, pathname);
        console.log(filePath);
        try {
            // 用流读取文件
            let statObj = await fs.stat(filePath);
            if (statObj.isFile()) {
            } else {
            }
        } catch (e) {
            this.sendError(req, res, e);
        }
    }
    // 专门处理错误信息
    sendError(req, res, e) {
        debug(e);
        res.statusCode = 404;
        res.end("Not Found");
    }
    start() {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, this.port, () => {
            console.log(chalk.yellow(`Starting up kaimo-http-server, serving ./${this.directory.split("\\").pop()}\r\n`));
            console.log(chalk.green(`       http://${this.host}:${this.port}`));
        });
    }
}

module.exports = Server;
