// const buffer = Buffer.alloc(5);
// console.log(buffer);

// const buffer = Buffer.from("凯小默");
// console.log(buffer);

// const buffer = Buffer.from([0xe5, 0x87, 0xaf, 0xe5, 0xb0, 0x8f, 0xe9, 0xbb, 0x98]);
// console.log(buffer);
// console.log(buffer.toString());

// const buffer = Buffer.from("凯小默");
// console.log(buffer);
// console.log(buffer.length);

// const buffer = Buffer.alloc(5);
// let buf = buffer.slice(0, 1);
// console.log(buf);
// buf[0] = 100;
// console.log(buffer);

// const buffer = Buffer.from("凯小默");
// console.log(Buffer.isBuffer(buffer));

// const buf1 = Buffer.from("凯小默");
// const buf2 = Buffer.from("博客");
// // 声明 15 个刚好能放下
// const bigBuf = Buffer.alloc(15);
// console.log("1---->", bigBuf, bigBuf.toString());
// buf1.copy(bigBuf, 0, 0, 9);
// console.log("2---->", bigBuf, bigBuf.toString());
// buf2.copy(bigBuf, 9, 0, 6);
// console.log("3---->", bigBuf, bigBuf.toString());

// Buffer.prototype.copy = function (target, targetStart, sourceStart, sourceEnd) {
//     console.log("进入--kaimo--copy");
//     // 将需要 copy 的 source 从 sourceStart 到 sourceEnd 循环遍历
//     for (let i = sourceStart; i < sourceEnd; i++) {
//         // 从 targetStart 开始，赋值给 target 的每一项
//         target[targetStart++] = this[i];
//     }
// };
// const buf1 = Buffer.from("凯小默");
// const buf2 = Buffer.from("博客");
// // 声明 15 个刚好能放下
// const bigBuf = Buffer.alloc(15);
// console.log("1---->", bigBuf, bigBuf.toString());
// buf1.copy(bigBuf, 0, 0, 9);
// console.log("2---->", bigBuf, bigBuf.toString());
// buf2.copy(bigBuf, 9, 0, 6);
// console.log("3---->", bigBuf, bigBuf.toString());

// const buf1 = Buffer.from("凯小默");
// const buf2 = Buffer.from("博客");
// const bigBuf = Buffer.concat([buf1, buf2], 15);
// console.log(bigBuf, bigBuf.toString());

const buf1 = Buffer.from("凯小默");
const buf2 = Buffer.from("博客");
Buffer.concat = function (list, length = list.reduce((x, y) => x + y.length, 0)) {
    console.log(list, length);
    let buffer = Buffer.alloc(length);
    let offset = 0; // 偏移量
    list.forEach((buf) => {
        buf.copy(buffer, offset);
        offset += buf.length;
    });
    return buffer.slice(0, offset);
};
const bigBuf = Buffer.concat([buf1, buf2, buf1, buf2]);
console.log(bigBuf, bigBuf.toString());
