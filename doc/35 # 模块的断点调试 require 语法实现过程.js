// 虚拟机模块：可以创建沙箱环境
// const k = 100;

// const vm = require("vm");
// vm.runInThisContext("console.log(a)");

// node 中如何实现代码的调试

// [node 调试指南](https://nodejs.org/zh-cn/docs/guides/debugging-getting-started)

// 1. 可以在浏览器中进行调试（比如调试 webpack 等模块可以使用）

// > `node --inspect-brk 文件`：会自动在代码运行的第一行打上断点

// let a = 1;
// let b = 2;
// function sum(x, y) {
//     return x + y;
// }
// sum(a, b);

// - 谷歌浏览器打开：`chrome://inspect/#devices`
// - 点击 `Open dedicated DevTools for Node` 打开 node 独立控制台
// - 运行 `node --inspect-brk '35 # 模块的断点调试 require 语法实现过程.js'`

// 2. 直接使用 vscode 等编辑器自带的调试，利用 launch.json 进行调试（最方便，用的最多的方式）

// - 创建 `launch.json` 文件

// 3. 在控制台中调试（在黑窗口调试）

// 调试分析 require 源码

// 1. `mod.require` 会默认调用 require 语法
// 2. `Module.prototype.require` 模块的原型上有 require 方法
// 3. `Module._load` 调用模块的加载方法，最终返回的是 `module.exports`
// 4. `Module._resolveFilename` 解析文件名，将文件名变成绝对路径，默认尝试添加 `.js .json` 等
// 5. `Module._cache` 默认会判断是否存在缓存
// 6. `new Module` 创建模块（对象），里面有 id，exports
// 7. `Module._cache[filename] = module` 把模块缓存起来，方便下次使用
// 8. `module.load` 尝试加载模块
// 9. `module.paths` 第三方模块查找的路径
// 10. `Module._extensions[extension]` 获取当前模块的拓展名，策略是根据拓展名调用对应的方法
// 11. `fs.readFileSync` 读取文件的内容
// 12. `module._compile` 去除文本文件 BOM 头，编译文件的内容
// 13. `Module.wrap` 将用户的内容包裹到一个函数中 `(function (exports, require, module, __filename, __dirname) { })`，用 `vm.runInThisContext` 创建沙箱环境，将字符串变成函数执行
