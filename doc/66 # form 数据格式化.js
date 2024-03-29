// 实现一个 http 服务器 客户端会发送请求 GET POST

// 要处理不同的请求体的类型
// 1. 表单格式（formData `a=1&b=2`），可以直接通信不会出现跨域问题
// 2. JSON （`"{"kaimo":"313"}"`）
// 3. 文件格式 （二进制）

const http = require("http");
const url = require("url");
const querystring = require("querystring");

let server = http.createServer();

server.on("request", (req, res) => {
    let { pathname } = url.parse(req.url);
    if (pathname === "/login" && req.method == "POST") {
        const arr = [];
        req.on("data", (chunk) => {
            arr.push(chunk);
        });
        req.on("end", () => {
            let result = Buffer.concat(arr).toString();
            if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
                let obj = querystring.parse(result, "&", "=");
                console.log(obj);
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(obj));
            }
        });
    }
});

server.listen(3000);
