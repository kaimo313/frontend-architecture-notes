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

const buf1 = Buffer.from("凯小默");
const buf2 = Buffer.from("博客");

// 声明 15 个刚好能放下
const bigBuf = Buffer.alloc(15);
console.log(bigBuf, bigBuf.toString());
buf1.copy(bigBuf, 0, 0, 9);
console.log(bigBuf, bigBuf.toString());
buf2.copy(bigBuf, 9, 0, 6);
console.log(bigBuf, bigBuf.toString());
