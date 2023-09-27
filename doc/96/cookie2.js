const http = require("http");
const querystring = require("querystring");

const server = http.createServer(function (req, res) {
    // 读取cookie
    req.getCookie = function (key) {
        let cookieObj = querystring.parse(req.headers.cookie, ";", "=");
        return cookieObj[key];
    };
    // 设置cookie
    let arr = [];
    res.setCookie = function (key, value, options = {}) {
        let opts = [];
        if (options.domain) {
            opts.push(`domain=${options.domain}`);
        }
        if (options.path) {
            opts.push(`domain=${options.path}`);
        }
        if (options.maxAge) {
            opts.push(`max-age=${options.maxAge}`);
        }
        if (options.httpOnly) {
            opts.push(`httpOnly`);
        }
        arr.push(`${key}=${value}; ${opts.join("; ")}`);
        res.setHeader("Set-Cookie", arr);
    };
    // 通过服务端写入 cookie
    console.log(req.headers.cookie);
    if (req.url === "/read") {
        res.end(req.getCookie("name") || "empty");
    } else if (req.url === "/write") {
        res.setCookie("name", "kaimo", {
            domain: ".kaimo.com",
            expires: `${new Date(Date.now() + 10 * 1000).toGMTString()}`
        });
        res.setCookie("age", "313", {
            maxAge: "10",
            httpOnly: true
        });
        res.end("write ok");
    } else {
        res.end("NOT FOUND");
    }
});

server.listen(3000);

console.log("Server running at http://127.0.0.1:3000/");
