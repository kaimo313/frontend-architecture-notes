// node 中的核心模块 http 可以快速的创建一个 web 服务

const http = require("http");
const url = require("url");

// req => request 客户端的所有信息
// res => respone 可以给客户端写入数据
const server = http.createServer();

server.on("request", (req, res) => {
    // 请求的方法
    console.log(req.method); // 方法名是大写的
    console.log(req.url); // 请求路径
    // http://localhost:3001/?a=1&b=2#333
    let { pathname, query } = url.parse(req.url, true);
    console.log(pathname); // 路径
    console.log(query); // 查询参数

    // request 是一个可读流
    // 有请求体才会触发 data 事件 curl -v -X POST --data k=1 http://localhost:3001
    let arr = [];
    req.on("data", (chunk) => {
        arr.push(chunk);
        console.log("chunk---->", chunk.toString());
    });
    // 请求发送过来之后，一定会触发  end 事件
    req.on("end", () => {
        console.log("req.end---->", Buffer.concat(arr).toString());
    });

    console.log(req.httpVersion); // http 版本
    // 所有的 header 获取时都是小写
    console.log(req.headers);

    // 可写流 write end 可写流的方法
    res.statusCode = "222";
    res.statusMessage = "kaimo666";
    // 设置响应头
    res.setHeader("kaimo", "313");
    res.setHeader("Content-type", "text/html;charset=utf-8");
    res.write("hello world");
    res.end("凯小默的博客");
    // 不能下面这样写，会报错 `write after end`，它表示文件已经关闭但是又进行了写入操作
    // res.end("凯小默的博客");
    // res.write("hello world");
});

// curl -v http://localhost:3000
let port = 3000;
// listen 是一个订阅模式，等会开启后会触发对应的回调的方法
server.listen(port, () => {
    console.log("serve run", port);
});

// 实现文件变化后自动重启 nodemon node monitor 可以监视自动重启
// npm install nodemon -g
// nodemon "61 # http 数据处理.js"

// events 模块 node 中基本上所有的模块都继承于 eventEmitter
// Error: listen EADDRINUSE: address already in use :::3000
server.on("error", (err) => {
    console.log("err---->", err);
    // 如果端口号被占用自动重启
    if (err.code === "EADDRINUSE") {
        server.listen(++port);
    }
});
