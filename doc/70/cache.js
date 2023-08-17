const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const filePath = path.join(__dirname, pathname);
    console.log(pathname);
    res.setHeader("Cache-Control", "no-cache");
    // 第二次请求会带上 if-modified-since 请求头
    let ifModifiedSince = req.headers["if-modified-since"];
    fs.stat(filePath, (err, statObj) => {
        if (err) return res.end();
        let lastModified = statObj.ctime.toGMTString();
        // 判断文件的修改时间是否对的上，一样的话直接返回 304 告诉读取缓存
        if (ifModifiedSince && lastModified === ifModifiedSince) {
            res.statusCode = 304;
            return res.end();
        }
        res.setHeader("Last-Modified", lastModified);
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
