const http = require("http");
const url = require("url");
const querystring = require("querystring");

let server = http.createServer();

server.on("request", (req, res) => {
    let { pathname } = url.parse(req.url);

    // 1）配置跨域
    // 配置跨域头允许任何网站访问
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 允许携带header
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    // 默认支持 get 和 post
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");

    // 遇到 OPTIONS 预检请求，直接成功即可
    if (req.method === "OPTIONS") {
        res.statusCode = "200";
        res.end();
    }
    // 2）解析请求体
    const arr = [];
    req.on("data", (chunk) => {
        arr.push(chunk);
    });
    req.on("end", () => {
        let result = Buffer.concat(arr).toString();
        console.log("result---->", result);
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
