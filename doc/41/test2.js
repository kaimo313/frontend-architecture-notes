const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");

let r = fs.readFileSync(path.resolve(__dirname, "./test2.txt"));
r = iconv.decode(r, "gbk");
console.log(r);
console.log(r.toString());
