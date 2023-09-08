const fs = require("fs");
const path = require("path");
const url = require("url");
const http = require("http");

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    const absPath = path.join(__dirname, pathname);

    fs.stat(absPath, (err, statObj) => {
        if (err) res.end("Not Found");
        console.log("absPath----->", absPath);
        console.log("statObj----->", statObj);
        if (statObj) {
            console.log(statObj.isDirectory());
            console.log(statObj.isFile());
            if (statObj.isFile()) {
                fs.createReadStream(absPath).pipe(res);
            } else {
                res.end("Not Found");
            }
        } else {
            res.end("Not Found");
        }
    });
}).listen(3000);
