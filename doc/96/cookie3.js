const http = require("http");
const querystring = require("querystring");
const crypto = require("crypto");

// 秘钥
const secret = "kaimo313";

// 为了编码能在网络中安全顺畅传输，这里可以直接把 / + = 三个符号置空
const sign = (value) =>
    crypto
        .createHmac("sha256", secret)
        .update(value)
        .digest("base64")
        .replace(/\/|\+|\=/g, "");

const server = http.createServer(function (req, res) {
    // 读取cookie
    req.getCookie = function (key, options) {
        let cookieObj = querystring.parse(req.headers.cookie, ";", "=");
        if (options.signed) {
            let [value, s] = (cookieObj[key] || "").split(".");
            let newSign = sign(value);
            if (newSign === s) {
                // 签名一致，说明这次的内容是没有被改过的
                return value;
            } else {
                // 签名被篡改了，不能使用
                return undefined;
            }
        }
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
        if (options.signed) {
            value = value + "." + sign(value);
        }
        arr.push(`${key}=${value}; ${opts.join("; ")}`);
        res.setHeader("Set-Cookie", arr);
    };
    // 通过服务端写入 cookie
    console.log(req.headers.cookie);
    if (req.url === "/read") {
        res.end(
            req.getCookie("name", {
                signed: true
            }) || "empty"
        );
    } else if (req.url === "/write") {
        res.setCookie("name", "kaimo", {
            domain: ".kaimo.com",
            expires: `${new Date(Date.now() + 10 * 1000).toGMTString()}`,
            signed: true // 加签名
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
