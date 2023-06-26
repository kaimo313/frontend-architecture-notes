## buffer

Buffer 代表的都是二进制数据，代表是内存，它不能扩容（java 数组不能扩容，想扩容可以使用动态数组，或者生成一个新的内存拷贝过去）

服务端可以操作二进制，Buffer 可以和字符串进行相互转换

## buffer 的三种声明方式

开发中数字都是以字节为单位

**1. 通过长度来声明**

```js
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

slice 方法是浅拷贝

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

### copy

缓冲区是一种临时存储器，用于在将数据从一个位置移动到另一位置时存储数据。它就像一个整数数组。

`buffer.copy()` 方法只是将所有值从输入缓冲区复制到另一个缓冲区。

copy 参数 （target, targetStart, sourceStart, sourceEnd）

- target：它是一个缓冲区，需要在其中复制所有值。
- targetStart：它指的是目标缓冲区的元素将开始写入的起始索引。其默认值为 0。
- sourceStart：它是输入缓冲区的索引，将从该索引开始复制值。其默认值为 0。
- sourceEnd：输入缓冲区的索引，直到完成值的复制为止。其默认值为 `buffer.length`