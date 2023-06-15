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

// 简单实现一个自己的 require 去加载 js 文件

const path = require("path");
const fs = require("fs");
const vm = require("vm");

function Module(id) {
    this.id = id;
    this.exports = {};
}
Module.warp = function (script) {
    let arr = [`(function (exports, require, module, __filename, __dirname) {`, script, `})`];
    return arr.join("");
};
// 加载策略
Module._extensions = {
    ".js": function (module) {
        console.log("js---->", module);
        // 同步读取
        let content = fs.readFileSync(module.id, "utf-8");
        let fnStr = Module.warp(content);
        console.log("fnStr---->", fnStr);
        let fn = vm.runInThisContext(fnStr);
        console.log("fn---->", fn.toString());
        let exports = module.exports;
        let require = kaimoRequire;
        let __filename = module.id;
        let __dirname = path.dirname(module.id);
        // 改变 this 指向 exports
        fn.call(exports, exports, require, module, __filename, __dirname);
        // 用户会给 module.exports 赋值
    },
    ".json": function (module) {
        console.log("json---->", module);
        // 同步读取
        let content = fs.readFileSync(module.id, "utf-8");
        module.exports = JSON.parse(content);
    }
};

// 把文件名变成绝对路径
Module._resolveFilename = function (filepath) {
    // 根据当前路径实现解析
    let filePath = path.resolve(__dirname, filepath);
    // 判断当前文件是否存在
    let exists = fs.existsSync(filePath);
    if (exists) return filePath;
    // 尝试添加后缀
    let keys = Object.keys(Module._extensions);
    for (let i = 0; i < keys.length; i++) {
        let currentPath = filePath + keys[i];
        // 尝试加载后缀查找
        if (fs.existsSync(currentPath)) {
            return currentPath;
        }
    }
    throw new Error("模块不存在");
};

// 获取文件的后缀名进行加载
Module.prototype.load = function (filename) {
    let extname = path.extname(filename);
    Module._extensions[extname](this);
};

// 缓存模块
Module.cache = {};

// 加载模块
Module._load = function (filepath) {
    // 将路径转化成绝对路径
    let filename = Module._resolveFilename(filepath);
    console.log("filename---->", filename);

    // 获取路径后不要立即创建模块，先检查是否有缓存
    let cacheModule = Module.cache[filename];
    if (cacheModule) {
        return cacheModule.exports;
    }

    // 进行模块的创建，这里需要保证每个模块的唯一性，需要通过唯一路径进行查找
    let module = new Module(filename);
    // 缓存模块
    Module.cache[filename] = module;
    // 模块加载
    module.load(filename);
    return module.exports;
};

// 自己实现的 require 方法
function kaimoRequire(filepath) {
    // 根据路径加载模块
    return Module._load(filepath);
}

// 测试
let k = kaimoRequire("./37/a");

console.log("测试 kaimoRequire 输出 k---->", k);

// 1. require 语法是同步的，用的是 `fs.readFileSync`
// 2. 最终 require 语法返回的是 `module.exports`
// 3. 模块的 exports 和 `module.exports` 引用的是同一个变量
// 4. 模块是动态加载的，每次 require 都会获取最新的导出的结果，可以将 require 写到条件中
// 5. 更改 exports 的引用，不会导致 `module.exports` 的变化
// 6. 循环引用的解决方案就是不循环引用，一般不会出现，如果出现只能加载部分数据
