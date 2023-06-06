// cwd：current working directory 表示当前用户的工作目录（这个目录可以更改用户自己切换即可）
// 当用户在哪执行 node 命令，就去哪找配置文件
// console.log(process.cwd());

// __dirname：当前文件所在的目录，这个目录是不能手动修改的，它不是 global 上的属性，是每个模块都会传入的属性
// console.log(__dirname);

// env：环境变量，可以根据环境变量实现不同的功能，比如：
// let domain = process.env.NODE_ENV === "production" ? "localhost" : "https://blog.csdn.net/kaimo313";
// 设置临时的环境变量
// window set key=value 或者 mac export key=value
// set kaimo=313
// console.log(process.env.kaimo);

// node 中自己实现的微任务 nextTick / queueMicrotask，宏任务 setImmediate
// console.log(process.nextTick);
// ```js
// setTimeout(() => {
//     console.log(2);
// });
// process.nextTick(() => {
//     console.log(1);
// });
// queueMicrotask(() => {
//     console.log(3);
// });
// // 输出 1 3 2
// ```

// 常见面试题 node 中的事件环和浏览器中的区别？
// 微任务有哪些？宏任务有哪些？

// 浏览器的事件环跟 node 的事件环执行效果是一样的
// [https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick)

// 事件循环操作顺序的简化概览
// [简化图](./29/事件循环机制解析.png)

// - `timers`: 此阶段执行由 `setTimeout()` 和 `setInterval()` 排序。
// - `pending callbacks`: 执行 I/O 回调推迟到下一个循环 迭代。
// - `idle, prepare`: 仅在内部使用。
// - `poll`: 检索新的 `I/O` 事件; 执行与 `I/O` 相关的几乎任何回调（由“计时器”或 “`setImmediate()`”所设的紧邻回调除外); node 将在适当时机在此处暂停。
// - `check`: `setImmediate()` 回调在此处被调用。
// - `close callbacks`：一些关闭的回调函数，如：`socket.on('close', ...)`。

// 进入事件环时 setTimeout 有可能没有完成
// ```
// // 可能先输出 setTimeout，然后输出 setImmediate，或者先输出 setImmediate，再输出 setTimeout
// setTimeout(() => {
//     console.log("setTimeout");
// }, 0);
// setImmediate(() => {
//     console.log("setImmediate");
// });
// ```

// poll 完之后 setImmediate -> setTimeout
// ```js
// const fs = require("fs");
// fs.readFile("./file/name.txt", "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     setTimeout(() => {
//         console.log("setTimeout");
//     }, 0);
//     setImmediate(() => {
//         console.log("setImmediate");
//     });
// });
// ```

// process.nextTick 并不属于事件环的一部分 在本轮代码执行后执行（timers 到 poll 为一轮，如果后有 check 就执行 check ）
// nextTick 比 Promise 的 then 要快一些
// ```js
// setTimeout(() => {
//     console.log(1);
//     Promise.resolve().then(() => {
//         console.log("then");
//     });
//     process.nextTick(() => {
//         console.log("nextTick");
//     });
// }, 0);

// setTimeout(() => {
//     console.log(2);
// }, 0);
// ```
