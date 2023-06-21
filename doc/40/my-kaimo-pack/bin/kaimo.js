#! /usr/bin/env node

console.log("进入 bin 下的 kaimo.js 文件");

process.argv.slice(2).reduce((x, y) => Number(x) + Number(y));
