// ## node 和前端的区别

// - 前端里面有 BOM 和 DOM，服务端没有，也没有 window
// - 服务端里面有 global 全局对象（浏览器也有 global，只不过访问属性的时候都是通过 window 来代理，没有直接访问 global，也不能直接访问 global）

// console.log(global);
// global 跟 window 一样，可以循环引用
// console.log(global.global.global);

// 浏览器以前的方法还是可以使用的，只是默认没有被枚举出来，比如：encodeURI
// 可以打印一下 global 的隐藏属性
// console.dir(global, { showHidden: true });

// ### process 进程（重要）
// process 默认取值就会向 global 中查找
// 不能写成 this.process：node中有一个模块化系统，是以文件为单位，每个文件都是一个模块，模块中的 this 被更改成 {}
// console.log(global.process);

// （1）platform：可以用这个属性来判断当前执行的系统环境
// 具体可以查看文档：[https://nodejs.org/api/process.html#process_process_platform](https://nodejs.org/api/process.html#process_process_platform)
// console.log(process.platform);

// （2）argv：可以解析用户传递的参数（第一个参数：node.exe；第二个参数：node当前执行的文件）
// 执行 node 文件 `node index.js a b c d` `webpack --mode --config --port --process`
// console.log(process.argv);

// node '28 # commander 的用法.js' --port 3000 --color red --config kaimo
// let args = process.argv.slice(2);
// let obj = {};
// args.forEach((item, index) => {
//     if (item.startsWith("--")) {
//         obj[item.slice(2)] = args[index + 1];
//     }
// });
// console.log(obj); // { port: '3000', color: 'red', config: 'kaimo' }

// ## commander
// (commander TJ)[https://github.com/tj/commander.js/](https://github.com/tj/commander.js/)
// (yargs webpack)
// ```bash
// npm init -y
// npm install commander
// ```
// 在 npm 上的模块都需要先安装在使用（模块内部也提供了几个属性，也可以在模块中直接访问，比如：require 就相当与是参数）
const program = require("commander");
let kaimo = program
    .command("create")
    .action(() => {
        console.log("创建项目");
    })
    .version("3.1.3")
    .name("kaimo")
    .usage("怎么使用？")
    .option("-p,--port <v>", "设置你的端口")
    .option("-c,--color <v>", "设置你的颜色")
    .option("-cf,--config <v>", "设置你的配置")
    .parse(process.argv);
// console.log("kaimo---->", kaimo);
