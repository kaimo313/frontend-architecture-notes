let buffer = Buffer.from("凯");
console.log(buffer); // e5 87 af

// 16进制转成二进制
console.log((0xe5).toString(2)); // 11100101
console.log((0x87).toString(2)); // 10000111
console.log((0xaf).toString(2)); // 10101111

// 11100101 10000111 10101111
// 组合起来分成 4 份，每份 6 位，不会超过 64
// 111001 011000 011110 101111

// 再将二进制转为十进制
console.log(parseInt("111001", 2)); // 57
console.log(parseInt("011000", 2)); // 24
console.log(parseInt("011110", 2)); // 30
console.log(parseInt("101111", 2)); // 47

// 57 24 30 47

// 取值表
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// 字符串 `凯` base64 编码之后变成了`5Yev`，字节由 3 个变成了 4 个。
console.log(str[57] + str[24] + str[30] + str[47]); // 5Yev
