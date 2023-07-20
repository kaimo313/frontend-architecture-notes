const fs = require("fs");

// 同步创建文件夹
// fs.mkdirSync("a");
// 创建目录得保证父路径存在
// fs.mkdirSync("a/b");

// 同步
function mkdirSyncP(paths) {
    let arr = paths.split("/");
    for (let i = 0; i < arr.length; i++) {
        let currentPath = arr.slice(0, i + 1).join("/");
        console.log("mkdirSyncP---currentPath---->", currentPath);
        // 如果文件夹不存在就创建
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    }
}

mkdirSyncP("a/b/c/d/e");

// 异步：不会阻塞主线程
function mkdirP(paths, cb) {
    let arr = paths.split("/");
    let index = 0;
    function next() {
        // 如果路径不存在就停止创建
        if (index === arr.length) return cb();
        let currentPath = arr.slice(0, ++index).join("/");
        // fs.exists 被废弃，可以使用 fs.access 替代
        console.log("mkdirP---currentPath---->", currentPath);
        fs.access(currentPath, (err) => {
            // 没有文件夹就报错，报错就异步创建，不报错就 next
            if (err) {
                fs.mkdir(currentPath, next);
            } else {
                next();
            }
        });
    }
    next();
}

mkdirP("b/c/d/e/f/g", () => {
    console.log("异步创建成功");
});

const fs2 = require("fs").promises;
async function mkdirP2(paths) {
    let arr = paths.split("/");
    for (let i = 0; i < arr.length; i++) {
        let currentPath = arr.slice(0, i + 1).join("/");
        console.log("mkdirP2---currentPath---->", currentPath);
        // 如果文件夹不存在就创建
        try {
            await fs2.access(currentPath);
        } catch (error) {
            console.log(error);
            await fs2.mkdir(currentPath);
        }
    }
}

mkdirP2("c/d/e/f");
