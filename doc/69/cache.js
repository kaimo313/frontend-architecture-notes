const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const filePath = path.join(__dirname, pathname);
    console.log(pathname);
    // expires 老版本浏览器支持的 绝对时间
    // cache-control 相对时间
    res.setHeader("Expires", new Date(Date.now() + 10 * 1000).toGMTString());
    res.setHeader("Cache-Control", "max-age=10");
    fs.stat(filePath, (err, statObj) => {
        if (err) return (res.statusCode = 404), res.end("Not Found");
        // 判断是否是文件
        if (statObj.isFile()) {
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.statusCode = 404;
            res.end("Not Found");
        }
    });
});
server.listen(5000);
