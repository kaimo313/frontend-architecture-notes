const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const crypto = require("crypto");

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const filePath = path.join(__dirname, pathname);
    console.log(req.headers);
    res.setHeader("Cache-Control", "no-cache");
    // 拿到客户端传过来的 if-none-match 文件标识
    let ifNoneMatch = req.headers["if-none-match"];

    fs.stat(filePath, (err, statObj) => {
        if (err) return res.end();
        // 进行文件摘要产生hash
        let contentHash = crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("base64");
        if (ifNoneMatch === contentHash) {
            res.statusCode = 304;
            return res.end();
        }
        res.setHeader("ETag", contentHash);
        // 第一请求，需要根据内容生成一个唯一的标识：可以对应当前的文件
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
