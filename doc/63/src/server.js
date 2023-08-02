// 核心模块
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs").promises;
const { createReadStream, createWriteStream, readFileSync } = require("fs");

// 第三方模块
const ejs = require("ejs"); // 服务端读取目录进行渲染
const mime = require("mime");
const chalk = require("chalk");
const debug = require("debug")("server");
// 根据环境变量来进行打印 process.env.EDBUG
debug("hello kaimo-http-server");

// 同步读取模板
const template = readFileSync(path.resolve(__dirname, "template.ejs"), "utf-8");

class Server {
    constructor(config) {
        this.host = config.host;
        this.port = config.port;
        this.directory = config.directory;
        this.template = template;
    }
    async handleRequest(req, res) {
        let { pathname } = url.parse(req.url);
        // 需要对 pathname 进行一次转义，避免访问中文名称文件找不到问题
        console.log(pathname);
        pathname = decodeURIComponent(pathname);
        console.log(pathname);
        // 通过路径找到这个文件返回
        let filePath = path.join(this.directory, pathname);
        console.log(filePath);
        try {
            // 用流读取文件
            let statObj = await fs.stat(filePath);
            // 判断是否是文件
            if (statObj.isFile()) {
                this.sendFile(req, res, filePath, statObj);
            } else {
                // 文件夹的话就先尝试找找 index.html
                let concatFilePath = path.join(filePath, "index.html");
                try {
                    let statObj = await fs.stat(concatFilePath);
                    this.sendFile(req, res, concatFilePath, statObj);
                } catch (e) {
                    // index.html 不存在就列出目录
                    this.showList(req, res, filePath, statObj, pathname);
                }
            }
        } catch (e) {
            this.sendError(req, res, e);
        }
    }
    // 列出目录
    async showList(req, res, filePath, statObj, pathname) {
        // 读取目录包含的信息
        let dirs = await fs.readdir(filePath);
        console.log(dirs, "-------------dirs----------");
        try {
            let parseObj = dirs.map((item) => ({
                dir: item,
                href: path.join(pathname, item), // url路径拼接自己的路径
            }));
            // 渲染列表：这里采用异步渲染
            let templateStr = await ejs.render(
                this.template,
                { dirs: parseObj },
                { async: true }
            );
            console.log(templateStr, "-------------templateStr----------");
            res.setHeader("Content-type", "text/html;charset=utf-8");
            res.end(templateStr);
        } catch (e) {
            this.sendError(req, res, e);
        }
    }
    // 读取文件返回
    sendFile(req, res, filePath, statObj) {
        // 设置类型
        res.setHeader(
            "Content-type",
            mime.getType(filePath) + ";charset=utf-8"
        );
        // 读取文件进行响应
        createReadStream(filePath).pipe(res);
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
            console.log(
                chalk.yellow(
                    `Starting up kaimo-http-server, serving ./${this.directory
                        .split("\\")
                        .pop()}\r\n`
                )
            );
            console.log(chalk.green(`       http://${this.host}:${this.port}`));
        });
    }
}

module.exports = Server;
