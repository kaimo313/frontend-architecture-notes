const fs = require("fs");
const path = require("path");

let r = fs.readFileSync(path.resolve(__dirname, "./test.md"));

console.log(r);
// Buffer 可以和字符串直接互相转换
console.log(r.toString());
