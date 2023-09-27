## cookie 和 session 和 sessionStorage 和 localStorage

- localStorage 和 sessionStorage 本地储存（发送请求不会携带），不能跨域
- localStorage 浏览器关闭后不会清空，必须手动清空
- sessionStorage 浏览器关闭后就会销毁
- http 无状态的，可以通过 cookie 来制造状态（浏览器跟服务端都可以设置cookie），每次发送请求默认会携带 cookie
- cookie 不安全，数据是存在客户端的，可以篡改，不能存放敏感信息
- session 基于 cookie 的，通过 cookie 的机制，制造一个服务端存储的空间
- session 比 cookie 安全，每次重启服务会丢失，可以用 redis 来存储 session

## 通过服务端写入 cookie

- domain 域名设置，默认当前域名，如果设置 `Domain=mozilla.org`，则 Cookie 也包含在子域名中（如 `developer.mozilla.org`）。
- path 路径（/ 表示任意路径）限制写入时 cookie 的路径
- exipres 绝对时间 / max-age 相对时间
- httpOnly 是否客户端可以操作 cookie

例子：

```js
const http = require("http");
const querystring = require("querystring");

const server = http.createServer(function (req, res) {
    // 通过服务端写入 cookie
    console.log(req.headers.cookie);
    if (req.url === "/read") {
        // 读取cookie
        res.end(JSON.stringify(querystring.parse(req.headers.cookie, ";", "=")));
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
```

注：可以打开 `C:\Windows\System32\drivers\etc\hosts` 文件，增加自定义本地访问域名

```bash
127.0.0.1 a.kaimo.com
127.0.0.1 b.kaimo.com
```

然后我们访问 `http://a.kaimo.com:3000/write` 写入cookie，分别读取 cookie `http://a.kaimo.com:3000/read`、`http://b.kaimo.com:3000/read`

## 封装 cookie 的读取写入

```js
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
```

## cookie 安全性问题

当给浏览器设置 cookie 的时候，可以增加签名，根据数据内容创建一个唯一的签名（MD5），这种方式可以伪造，

采用另外一种方式，使用 sha256 加盐算法，根据内容和秘钥算出一个签名（不能反解），相同的秘钥签名的结果是相同的

> 在密码学中，是指通过在密码任意固定位置插入特定的字符串，让散列后的结果和使用原始密码的散列结果不相符，这种过程称之为“加盐”。

```js
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
```