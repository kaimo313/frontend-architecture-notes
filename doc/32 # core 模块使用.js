// ## 核心模块

// - fs（fileSystem）：处理文件
// - path：处理路径
// - vm：虚拟机模块、沙箱环境

// fs 所有的方法基本是同步方法，异步方法
// - 同步：如果刚刚运行程序，可以去使用同步的，因为同步性能更高
// - 异步：开启一个服务监听客户端访问，就需要使用异步（异步是非阻塞的）
const fs = require("fs");
const path = require("path");

// 操作文件时尽量使用绝对路径操作
// 获取当前的目录 __dirname 不可变
console.log(path.resolve(__dirname, "../file/name.txt"));
// resolve 不能遇到 `/`，不然会进到根目录去
console.log(path.resolve(__dirname, "../file/name.txt", "/"));
// 拼接可以用 join
console.log(path.join(__dirname, "../file/name.txt", "/"));
// 获取当前路径的拓展名
console.log(path.extname("./6/kaimo-promise.js"));

// 1、同步判断文件是否存在（异步方法去掉了，它不符合第一错误原则）
const exists = fs.existsSync(path.resolve(__dirname, "../file/", "name.txt"));
console.log("文件是否存在--->", exists);
// 2、同步方式读文件
const name = fs.readFileSync(path.resolve(__dirname, "../file/", "name.txt"), "utf-8");

console.log(name);
