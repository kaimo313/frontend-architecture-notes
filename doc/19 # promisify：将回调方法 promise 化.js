// promise 可以解决的问题：1.回调嵌套的问题 .then.then  2、可以同步多个请求的结果

// 之前写个单独的方法去处理文件读取
// function read(filename) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filename, "utf-8", function (err, data) {
//             if (err) reject(err);
//             resolve(data);
//         });
//     });
// }

// 将 node 的 api 快速的转化成 promise 的形式

// const fs = require("fs").promises;
// fs.readFile("./file/age.txt", "utf-8").then((data) => {
//     console.log("data---->", data);
// });

// 或者可以使用下面的 util 工具
// const fs = require("fs");
// const util = require("util");

// let read = util.promisify(fs.readFile);

// read("./file/name.txt", "utf-8").then((data) => {
//     console.log("data---->", data);
// });

// 实现一个 promisify 转换 node api 的方法
// 这里可以简写去掉return，(fn) => (...args) => new Promise，我这里就保留方便理解
const promisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    };
};

const fs = require("fs");

let read = promisify(fs.readFile);

read("./file/name.txt", "utf-8").then((data) => {
    console.log("data---->", data);
});
