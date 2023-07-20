// 异步文件操作api
// 1.删除操作：删除文件 `fs.unlink`，删除目录 `fs.rmdir`
// 2.提供有关文件的信息：`fs.stat` 返回的对象里有 isFile（是否是文件）、isDirectory（是否是文件系统目录）
// 3.读取目录的内容：`fs.readdir`

const fs = require("fs");
const path = require("path");
// 异步串行删除：把所有的异步逻辑串成一根线
// function rmdir(dir, cb) {
//     fs.stat(dir, (err, statObj) => {
//         // 首先需要判断 dir 是否是文件夹
//         if (statObj.isDirectory()) {
//             fs.readdir(dir, (err, dirs) => {
//                 dirs = dirs.map((d) => path.join(dir, d));
//                 console.log("dir---dirs---->", dir, dirs);
//                 // 当前层节点的索引，用于记录删除的个数
//                 let index = 0;
//                 function next() {
//                     // 如果 index === dirs.length 标明 dir 目录下的文件和文件夹都删除完毕了
//                     if (index === dirs.length) return fs.rmdir(dir, cb);
//                     let currentDir = dirs[index++];
//                     rmdir(currentDir, next);
//                 }
//                 next();
//             });
//         } else {
//             fs.unlink(dir, cb);
//         }
//     });
// }
// rmdir("a", (err) => {
//     console.log("异步串行删除");
// });

// 异步并行删除
function rmdir(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        // 首先需要判断 dir 是否是文件夹
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, dirs) => {
                dirs = dirs.map((d) => path.join(dir, d));
                console.log("dir---dirs---->", dir, dirs);
                // 先判断是否有子目录，没有直接删除
                if (dirs.length === 0) return fs.rmdir(dir, cb);
                // 用来累加删除的个数
                let index = 0;
                function done() {
                    // 条件相等表明子目录删除完了，就可以删除父目录
                    if (++index === dirs.length) fs.rmdir(dir, cb);
                }
                // 循环并发删除子目录
                for (let i = 0; i < dirs.length; i++) {
                    let currentDir = dirs[i];
                    // 每个删除完之后，累加删除的个数
                    rmdir(currentDir, done);
                }
            });
        } else {
            fs.unlink(dir, cb);
        }
    });
}
rmdir("k", (err) => {
    console.log("异步并行删除");
});
