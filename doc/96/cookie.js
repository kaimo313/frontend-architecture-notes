const http = require("http");
const querystring = require("querystring");

const server = http.createServer(function (req, res) {
    // 通过服务端写入 cookie
    console.log(req.headers.cookie);
    if (req.url === "/read") {
        // 读取cookie
        res.end(JSON.stringify(querystring.parse(req.headers.cookie, "; ", "=")));
    } else if (req.url === "/write") {
        // 设置cookie
        res.setHeader("Set-Cookie", [
            `name=kaimo; domain=.kaimo.com; expires=${new Date(Date.now() + 10 * 1000).toGMTString()}`,
            "age=313; max-age=10; httpOnly"
        ]);
        res.end("write ok");
    } else {
        res.end("NOT FOUND");
    }
});

server.listen(3000);

console.log("Server running at http://127.0.0.1:3000/");
