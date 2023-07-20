// 文件操作api
// 1.删除操作：删除文件 `fs.unlinkSync`，删除目录 `fs.rmdirSync`
// 2.提供有关文件的信息：`fs.statSync` 返回的对象里有 isFile（是否是文件）、isDirectory（是否是文件系统目录）
// 3.读取目录的内容：`fs.readdirSync`
const fs = require("fs");
const path = require("path");

// let dirs = fs.readdirSync("k");
// dirs = dirs.map((item) => path.join("k", item));
// console.log("dirs---->", dirs);
// dirs.forEach((item) => {
//     // 获取文件的状态信息
//     let statObj = fs.statSync(item);
//     console.log("statObj---->", item, statObj.isFile());
//     if (statObj.isFile()) {
//         fs.unlinkSync(item);
//     } else {
//         fs.rmdirSync(item);
//     }
// });
// fs.rmdirSync("k");

function rmdirSync(dir) {
    // 首先需要判断 dir 是否是文件夹
    let statObj = fs.statSync(dir);
    if (statObj.isDirectory()) {
        let dirs = fs.readdirSync(dir);
        console.log("dir---->", dir);
        dirs.forEach((d) => {
            rmdirSync(path.join(dir, d));
        });
        fs.rmdirSync(dir);
    } else {
        fs.unlinkSync(dir);
    }
}
rmdirSync("a");
