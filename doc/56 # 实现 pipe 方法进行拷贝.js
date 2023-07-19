const fs = require("fs");
const path = require("path");

// pipe 是异步的，可以实现读一点写一点
// fs.createReadStream(path.resolve(__dirname, "./56/name.txt")).pipe(fs.createWriteStream(path.resolve(__dirname, "./56/copy_name.txt")));

// 默认读 4 写 1
const KaimoReadStream = require("./56/KaimoReadStream"); // 64k
const KaimoWriteStream = require("./56/KaimoWriteStream"); // 16k

let rs = new KaimoReadStream(path.resolve(__dirname, "./56/name.txt"), {
    highWaterMark: 4
});
// 先写1个，3个放缓存
let ws = new KaimoWriteStream(path.resolve(__dirname, "./56/copy_name2.txt"), {
    highWaterMark: 1
});
// 管道的优势：不会淹没可用内存，但是在导入的过程中无法获取到内容
rs.pipe(ws);
