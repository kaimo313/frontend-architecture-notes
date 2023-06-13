// require 源码大致过程

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

// 简单实现一个自己的 require 去加载 json 文件
const path = require("path");
const fs = require("fs");

function Module(id) {
    this.id = id;
    this.exports = {};
}

// 加载策略
Module._extensions = {
    ".js": function () {},
    ".json": function (module) {
        console.log("json---->", module);
        // 同步读取
        let content = fs.readFileSync(module.id);
        module.exports = JSON.parse(content);
    }
};

// 把文件名变成绝对路径
Module._resolveFilename = function (filepath) {
    let filePath = path.resolve(__dirname, filepath);
    let exists = fs.existsSync(filePath);
    if (exists) return filePath;
    // 尝试添加后缀
    let keys = Object.keys(Module._extensions);
    for (let i = 0; i < keys.length; i++) {
        let currentPath = filePath + keys[i];
        if (fs.existsSync(currentPath)) {
            return currentPath;
        }
    }
};

// 获取文件的后缀名进行加载
Module.prototype.load = function (filename) {
    let extname = path.extname(filename);
    Module._extensions[extname](this);
};

// 加载模块
Module._load = function (filepath) {
    let filename = Module._resolveFilename(filepath);
    console.log("filename---->", filename);
    // 进行模块的创建
    let module = new Module(filename);
    // 模块加载
    module.load(filename);
    return module.exports;
};

// 自己实现的 require 方法
function kaimoRequire(filepath) {
    // 加载模块
    return Module._load(filepath);
}

// 测试
let k = kaimoRequire("./36/a");
console.log("测试 kaimoRequire 输出 k---->", k);
