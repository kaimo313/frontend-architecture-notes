// 写入10个数，只占用一个字节的内存
const fs = require("fs");
const path = require("path");

const KaimoWriteStream = require("./55/KaimoWriteStream");

let ws = new KaimoWriteStream(path.resolve(__dirname, "./55/number.txt"), {
    highWaterMark: 3 // 利用 highWaterMark 来控制写入的速率
});

let numberIndex = 0;
function write() {
    let flag = true; // 是否可以写入
    while (flag && numberIndex < 10) {
        flag = ws.write(numberIndex + "");
        numberIndex++;
    }
}
write();
ws.on("drain", () => {
    console.log("ws---drain--->");
    write();
});
