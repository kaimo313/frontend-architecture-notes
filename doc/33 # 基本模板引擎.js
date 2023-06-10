// ## 虚拟机环境（沙箱）

// 比如：测试用例的时候可以使用沙箱这个干净的环境执行

// 内部一般情况下操作的都是字符串逻辑，如何让一个字符串运行？

// 1、使用 eval，默认会取当前的作用域下的变量，这个不干净的环境

// const a = 100;
// eval("console.log('a---->', a)");

// 2、使用 new Function 来创建一个沙箱环境，让字符串执行

// const b = 200;
// let fn = new Function("c", "d", "e", "console.log('b---->', b)");
// console.log(fn.toString());
// fn();

// ejs 模块渲染

// ```bash
// npm install ejs
// ```

const ejs = require("ejs");
const path = require("path");

ejs.renderFile(
    path.resolve(__dirname, "../file/template.html"),
    { name: "kaimo", age: "313", arr: [1, 2, 3] },
    (err, data) => {
        console.log(data);
    }
);
