const querystring = require("querystring");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
console.log("使用的是 kaimo-koa-bodyparser 中间件", uuid.v4());
/**
 * @description 实现根据一个字符串来分割 buffer
 * @param {String} sep 分割字符串
 * @return {Array} 返回 buffer 数组
 * */
Buffer.prototype.split = function (sep) {
    let sepLen = Buffer.from(sep).length;
    let arr = [];
    let offset = 0;
    let currentIndex = 0;
    // 先赋值完在对比
    while ((currentIndex = this.indexOf(sep, offset)) !== -1) {
        arr.push(this.slice(offset, currentIndex));
        offset = currentIndex + sepLen;
    }
    // 剩余的也 push 到数组
    arr.push(this.slice(offset));
    return arr;
};

// 测试
const buffer = Buffer.from("凯小默1--凯小默2--凯小默3");
console.log(buffer.split("--"));

// 中间件的功能可以扩展属性、方法
module.exports = function (uploadDir) {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            const arr = [];
            ctx.req.on("data", function (chunk) {
                arr.push(chunk);
            });
            ctx.req.on("end", function () {
                if (ctx.get("content-type") === "application/x-www-form-urlencoded") {
                    const result = Buffer.concat(arr).toString();
                    console.log("kaimo-koa-bodyparser-result--x-www-form-urlencoded-->", result);
                    ctx.request.body = querystring.parse(result);
                }
                if (ctx.get("content-type").includes("multipart/form-data")) {
                    const result = Buffer.concat(arr);
                    console.log("result.toString----->", result.toString());
                    console.log("result----->", result);
                    let boundary = "--" + ctx.get("content-type").split("=")[1];
                    console.log("分隔符 boundary----->", boundary);
                    // 需要去掉无用的头尾
                    let lines = result.split(boundary).slice(1, -1);
                    console.log("lines----->", lines);
                    // 服务器收取到的结果全部放在这个对象中
                    let obj = {};
                    lines.forEach((line) => {
                        // 通过两个回车截取
                        let [head, body] = line.split("\r\n\r\n");
                        head = head.toString();
                        console.log("head----->", head);
                        // 获取到头部的
                        let key = head.match(/name="(.+?)"/)[1];
                        console.log("key----->", key);
                        // 根据 head 里是否有 filename 去区分是否是文件
                        if (!head.includes("filename")) {
                            console.log("body----->", body);
                            console.log("body.toString----->", body.toString());
                            // 去掉尾部无用字符
                            obj[key] = body.toString().slice(0, -2);
                        } else {
                            // 是文件，文件上传名字需要的是随机的，这里使用 uuid 库生成
                            // 拿到内容，去头尾
                            let content = line.slice(head.length + 4, -2);
                            console.log("uploadDir----->", uploadDir);
                            let filePath = path.join(uploadDir, uuid.v4());
                            console.log("filePath----->", filePath);
                            obj[key] = {
                                filePath,
                                size: content.length
                            };
                            fs.writeFileSync(filePath, content);
                        }
                    });
                    ctx.request.body = obj;
                }
                resolve();
            });
        });
        await next(); // 完成后需要继续向下执行
    };
};
