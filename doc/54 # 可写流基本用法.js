const fs = require("fs");
const path = require("path");

// 内部也是基于 events 模块，`fs.open`、`fs.write`，如果文件不存在就会创建文件，默认会清空文件并写入
let ws = fs.createWriteStream(path.resolve(__dirname, "./54/name.txt"), {
    flags: "w", // w 代表写入
    encoding: "utf-8",
    mode: 0o666, // 模式：可读可写
    autoClose: true, // fs.close
    start: 0,
    highWaterMark: 3, // 表示预期占用的内存（达到或者超过预期后返回的值就是false），默认 16k (指代的不是每次写多少) 不会影响内容的写入
});
// console.log(ws);

// `ws.write` 写入的内容，它是异步的，内容必须是 `string` or `buffer`
// `ws.end` 可以关闭文件，相当于 `ws.write + ws.close`
// `ws.on("drain", () => {})` 写完之后的通知事件
// 文件特有的 `ws.open` `ws.close`

// 下面三个是并发的，但是内部会维护一个链表，顺序是固定的
// 内部会维护一个变量，这个变量会统计写入的个数，当达到 highWaterMark 时，会返回 false，内容写入后，会在统计的数量的基础上减少
let flag = ws.write("h", () => {
    console.log("成功1");
});
console.log("是否符合预期--->", flag);
flag = ws.write("ello kaimo", () => {
    console.log("成功2");
});
console.log("是否符合预期--->", flag);
ws.end("!!!", () => {
    console.log("成功3");
});

// drain 触发的条件
// 1. 必须达到预期或者超过预期
// 2. 内存中的内容全部清空后
ws.on("drain", () => {
    console.log("drain--->");
});

// 写入10个数，只占用一个字节的内存
let ws2 = fs.createWriteStream(path.resolve(__dirname, "./54/number.txt"), {
    highWaterMark: 1, // 利用 highWaterMark 来控制写入的速率
});

// 如果直接按照下面的写法，一口气放入内存中，第一次写入只有一个0，但是还有9个在内存里，由一个链表保持写入的顺序不乱
// for (let i = 0; i < 10; i++) {
//     ws2.write(i + "");
// }

// 可以使用 flag 来处理
let numberIndex = 0;
function write() {
    let flag = true; // 是否可以写入
    while (flag && numberIndex < 10) {
        flag = ws2.write(numberIndex + "");
        numberIndex++;
    }
    if (numberIndex === 10) {
        ws2.end("!!");
    }
}
write();
ws2.on("drain", () => {
    console.log("ws2---drain--->");
    write();
});
ws2.on("close", () => {
    console.log("ws2---close--->");
});
