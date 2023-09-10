const fs = require("fs");
const path = require("path");
const url = require("url");
const http = require("http");
const querystring = require("querystring");

const messages = {
    en: {
        message: {
            hello: "hello world"
        }
    },
    "zh-CN": {
        message: {
            hello: "你好世界"
        }
    }
};

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    const absPath = path.join(__dirname, pathname);

    fs.stat(absPath, (err, statObj) => {
        if (err) return res.end("Not Found");
        console.log("absPath----->", absPath);
        let lans = req.headers["accept-language"];
        console.log("lans----->", lans); //  zh-CN,zh;q=0.9
        if (lans) {
            let r = querystring.parse(lans, ",", ";");
            // 根据权重进行排序
            console.log("r----->", r); // { 'zh-CN': '', zh: 'q=0.9' }
            let arr = [];
            Object.keys(r).forEach((key) => {
                if (r[key] == "") {
                    arr.push({
                        name: key,
                        q: 1
                    });
                } else {
                    arr.push({
                        name: key,
                        q: r[key].split("=")[1]
                    });
                }
            });
            arr.sort((a, b) => b.q - a.q);
            console.log("arr----->", arr); // [ { name: 'zh-CN', q: 1 }, { name: 'zh', q: '0.9' } ]
            let msgObj = Object.create(null);
            for (let i = 0; i < arr.length; i++) {
                msgObj = messages[arr[i].name];
                if (msgObj) {
                    res.end(msgObj.message.hello);
                    break;
                }
            }
            if (!msgObj) {
                res.end(messages.en.message.hello);
            }
        } else {
            res.end(messages.en.message.hello);
        }
    });
}).listen(3000);
