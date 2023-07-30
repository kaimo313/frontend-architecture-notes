const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// 访问链接 http://localhost:3000/62/index.html
const server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url, true);
    console.log(pathname); // /62/index.html 有路径 `/` 直接 join 拼接
    const filePath = path.join(__dirname, pathname);
    console.log(filePath);
    // 处理请求是单线程（代码尽量采用异步，否则会阻塞主线程）
    // if (pathname === "/sum") {
    //     let sum = 0;
    //     for (let i = 0; i < 10000000000; i++) {
    //         sum += i;
    //     }
    //     res.end(sum + "");
    // } else {
    //     res.end("ok");
    // }
    // 先判断文件是否存在 fs.stat
    // 如果直接访问 http://localhost:3000/62 路径，实现可以直接访问到 index.html
    fs.stat(filePath, (err, statObj) => {
        if (err) {
            res.end("not found");
        } else {
            if (statObj.isFile()) {
                fs.createReadStream(filePath).pipe(res);
            } else {
                let file = path.join(filePath, "index.html");
                fs.stat(file, (err, statObj) => {
                    if (err) {
                        res.end("not found");
                    } else {
                        fs.createReadStream(file).pipe(res);
                    }
                });
            }
        }
    });
});

server.listen(3000);

// const http = require("http");
// const url = require("url");
// const fs = require("fs");
// const path = require("path");

// class Server {
//     handleRequest(res, req) {
//         console.log("handleRequest--->", this);
//         // 不使用 bind，就需要 return 一个函数
//         // return () => {
//         //     console.log("handleRequest--->2", this);
//         // };
//     }
//     start(...args) {
//         // bind 原理就是产生一个新的函数
//         const server = http.createServer(this.handleRequest.bind(this));
//         server.listen(...args);
//     }
// }

// let server = new Server();

// server.start(3000, () => {
//     console.log("server run 3000");
// });
