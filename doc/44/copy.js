// 同步
// const fs = require("fs");
// const path = require("path");
// // 读取默认不指定编码都是 buffer 类型
// let r = fs.readFileSync(path.resolve(__dirname, "./name.txt"));
// console.log(r);
// // 默认会将二进制转化成字符串到文件，虽然看到的是字符串但是内部存储的是二进制
// fs.writeFileSync(path.resolve(__dirname, "./new_name.txt"), r);

// 异步
// const fs = require("fs");
// const path = require("path");
// fs.readFile(path.resolve(__dirname, "./name.txt"), function (err, data) {
//     if (err) throw err;
//     fs.writeFile(path.resolve(__dirname, "./new_name2.txt"), data, function (err) {
//         if (err) throw err;
//         console.log("写入成功");
//     });
// });

// 直接使用 copyFile
// const fs = require("fs");
// const path = require("path");
// fs.copyFile(path.resolve(__dirname, "./name.txt"), path.resolve(__dirname, "./new_name3.txt"), function (err) {
//     if (err) throw err;
//     console.log("name.txt was copied to new_name3.txt");
// });

// 读取操作
// const fs = require("fs");
// const path = require("path");
// // 先读取三个到内存中
// const buf = Buffer.alloc(3);
// // 打开文件读取文件
// // open(path, flags, callback)
// // flags：r（读取），w（写入），a（追加文件）
// fs.open(path.resolve(__dirname, "./read.txt"), "r", function (err, fd) {
//     // fd: Number 表示的是文件描述器（file descriptor）
//     // read(fd, buffer, offset, length, position, callback: (err, bytesRead, buffer)
//     // buffer 的第 0 个位置开始写入，写入到 buffer 中几个，文件的读取位置是多少
//     fs.read(fd, buf, 0, 3, 0, function (err, bytesRead, buffer) {
//         // bytesRead: 真正的读取个数
//         if (err) throw err;
//         console.log("读取成功", bytesRead, buffer);
//     });
// });

// 写操作
const fs = require("fs");
const path = require("path");
const wBuf = Buffer.from("凯小默");
// open(path, flags, mode, callback)
// w（写入）默认会先清空在写入，a（追加文件）
// mode：表示权限，这个可以看【拓展 Linux ls 命令】部分，默认就是 666 的权限，0o666 就是 438
fs.open(path.resolve(__dirname, "./write.txt"), "a", 438, function (err, fd) {
    if (err) throw err;
    // write(fd, buffer, offset, length, position, callback: (err, written, buffer)
    // 0 代表就是从 buffer 0 的位置开始读取，读取 6 个写入到文件的哪个位置中
    fs.write(fd, wBuf, 0, 9, 0, function (err, written, buffer) {
        if (err) throw err;
        console.log("写入成功", written, buffer);
    });
});
