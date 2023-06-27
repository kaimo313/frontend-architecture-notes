## buffer

Buffer 代表的都是二进制数据，代表是内存，它不能扩容（java 数组不能扩容，想扩容可以使用动态数组，或者生成一个新的内存拷贝过去）

服务端可以操作二进制，Buffer 可以和字符串进行相互转换

## buffer 的三种声明方式

开发中数字都是以字节为单位

**1. 通过长度来声明**

`Buffer.alloc()` 方法创建一个指定大小的新缓冲区对象。

```js
// 创建一个 5 字节的缓冲区对象
const buffer = Buffer.alloc(5);
console.log(buffer);
```

**2. 根据汉字来转化成 buffer**

```js
const buffer = Buffer.from("凯小默");
console.log(buffer);
```

**3. 通过数组来指定存放的内容**（不常用）

```js
const buffer = Buffer.from([0xe5, 0x87, 0xaf, 0xe5, 0xb0, 0x8f, 0xe9, 0xbb, 0x98]);
console.log(buffer);
console.log(buffer.toString());
```

## buffer 的方法

buffer 不具备扩展 push、shift 这些方法

### length

可以获取 buffer 字节的长度

```js
const buffer = Buffer.from("凯小默"); // 一个汉字 3 字节
console.log(buffer);
console.log(buffer.length); // 9 
```

### slice

slice 方法是浅拷贝，buffer 存放的都是内存地址，所有 slice 不会返回一个新的 buffer

```js
const buffer = Buffer.alloc(5);
let buf = buffer.slice(0, 1);
console.log(buf);
buf[0] = 100;
console.log(buffer);
```

### isBuffer

这个是 Buffer 的静态方法，用于判断是否是 buffer 类型

```js
const buffer = Buffer.from("凯小默");
console.log(Buffer.isBuffer(buffer));
```

### copy（用的少）

缓冲区是一种临时存储器，用于在将数据从一个位置移动到另一位置时存储数据。它就像一个整数数组。

`Buffer.copy()` 方法只是将所有值从输入缓冲区复制到另一个缓冲区。

copy 参数 （target, targetStart, sourceStart, sourceEnd）

- `target`：它是一个缓冲区，需要在其中复制所有值。
- `targetStart`：它指的是目标缓冲区的元素将开始写入的起始索引。其默认值为 0。
- `sourceStart`：它是输入缓冲区的索引，将从该索引开始复制值。其默认值为 0。
- `sourceEnd`：输入缓冲区的索引，直到完成值的复制为止。其默认值为 `buffer.length`

```js
const buf1 = Buffer.from("凯小默");
const buf2 = Buffer.from("博客");
// 声明 15 个刚好能放下
const bigBuf = Buffer.alloc(15);
console.log("1---->", bigBuf, bigBuf.toString());
buf1.copy(bigBuf, 0, 0, 9);
console.log("2---->", bigBuf, bigBuf.toString());
buf2.copy(bigBuf, 9, 0, 6);
console.log("3---->", bigBuf, bigBuf.toString());
```

**copy 方法的大致实现**

```js
Buffer.prototype.copy = function (target, targetStart, sourceStart, sourceEnd) {
    console.log("进入--kaimo--copy");
    // 将需要 copy 的 source 从 sourceStart 到 sourceEnd 循环遍历
    for (let i = sourceStart; i < sourceEnd; i++) {
        // 从 targetStart 开始，赋值给 target 的每一项
        target[targetStart++] = this[i];
    }
};
const buf1 = Buffer.from("凯小默");
const buf2 = Buffer.from("博客");
// 声明 15 个刚好能放下
const bigBuf = Buffer.alloc(15);
console.log("1---->", bigBuf, bigBuf.toString());
buf1.copy(bigBuf, 0, 0, 9);
console.log("2---->", bigBuf, bigBuf.toString());
buf2.copy(bigBuf, 9, 0, 6);
console.log("3---->", bigBuf, bigBuf.toString());
```

### concat

concat 的原理就是 copy。

concat 有两个参数 `concat(list, length)`.

```js
const buf1 = Buffer.from("凯小默");
const buf2 = Buffer.from("博客");
const bigBuf = Buffer.concat([buf1, buf2], 15);
console.log(bigBuf, bigBuf.toString());
```

**concat 大致实现原理**

```js
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
```
