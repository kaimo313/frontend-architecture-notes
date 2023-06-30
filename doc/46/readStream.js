const fs = require("fs");
const path = require("path");

// createReadStream(path: fs.PathLike, options?: BufferEncoding | ReadStreamOptions | undefined): fs.ReadStream
// 内部的实现原理还是：fs.open  fs.read  fs.close
let rs = fs.createReadStream(path.resolve(__dirname, "./name.txt"), {
    flags: "r", // r 代表读取
    encoding: null, // 默认 null，就是 buffer 类型的
    mode: 0o666, // 模式：可读可写
    autoClose: true, // fs.close
    start: 0, // 0 - 8 包前又包后
    end: 8,
    highWaterMark: 3 // 每次读取的个数
});
// console.log(rs);

let bufferArr = [];
// 监听 open（文件流特殊的事件，普通流没有）
rs.on("open", (fd) => {
    console.log("open---->", fd);
});
// 监听 data
rs.on("data", (data) => {
    console.log("data---->", data);
    bufferArr.push(data);
    // rs.pause 可以让可读流暂停触发 data 事件
    rs.pause();
    console.log("pause---->暂停");
    // 再次触发 data 事件，可以使用 rs.resume
    setTimeout(() => {
        console.log("过 2s 再次触发 data 事件");
        rs.resume();
    }, 2000);
});
// 监听 end
rs.on("end", () => {
    console.log("end---->", Buffer.concat(bufferArr).toString());
});
// 监听 error
rs.on("error", (err) => {
    console.log("err---->", err);
});
// 监听 close （文件流特殊的事件，普通流没有）
rs.on("close", () => {
    console.log("close---->");
});
