const http = require("http");
const url = require("url");
const querystring = require("querystring");

let server = http.createServer();

server.on("request", (req, res) => {
    let { pathname } = url.parse(req.url);
    console.log("req.method---->", req.method);

    // 1）配置跨域
    // 当前请求我的源
    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    // 允许携带header
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    // 默认支持 get 和 post
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
    /**
     * 预检请求（Preflight Request）是跨域资源共享（CORS）的一部分，它允许在请求头中包含一些特殊信息，
     *      以便服务器确认客户端是否具有足够的权限来访问受保护的资源。
     * 预检请求通常在请求方法为 OPTIONS 时发生，以检查客户端是否能够成功请求受保护的资源。
     * */
    // 设置 OPTIONS 发送频率
    // res.setHeader("Access-Control-Max-Age", 10); // 设置缓存预检响应为 10 秒
    // 遇到 OPTIONS 预检请求，直接成功即可
    // if (req.method === "OPTIONS") {
    //     res.statusCode = "200";
    //     res.end(); // 内部会自己判断是否加了跨域头
    // }
    // 2）解析请求体
    const arr = [];
    req.on("data", (chunk) => {
        arr.push(chunk);
    });
    req.on("end", () => {
        let result = Buffer.concat(arr).toString();
        let obj;
        if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
            obj = querystring.parse(result, "&", "=");
        } else if (req.headers["content-type"] === "application/json") {
            obj = JSON.parse(result);
        }
        console.log("obj---->", obj);
        // 3）根据不同路径返回对应内容
        if (pathname === "/login" && req.method == "POST") {
            res.setHeader("Content-Type", "application/json");
            res.end("登录成功");
        }
        if (pathname === "/regist" && req.method == "POST") {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(obj));
        }
    });
});

server.listen(3000);
