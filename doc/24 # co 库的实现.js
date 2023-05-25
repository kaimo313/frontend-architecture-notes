// 下面优化一下上节的这段代码

const fs = require("fs").promises;

// 代码更像是同步的，但是执行还是异步的
function* read() {
    let name = yield fs.readFile("./file/name.txt", "utf-8");
    let age = yield fs.readFile("./file/age.txt", "utf-8");
    return { name, age };
}

// // 需要优化的代码
// let it = read();
// let { value, done } = it.next();
// value.then((data1) => {
//     console.log("name---->", data1);
//     let { value, done } = it.next(data1);
//     value.then((data2) => {
//         let { value, done } = it.next(data2);
//         console.log("age---->", data2);
//         console.log("return---->", value);
//         // 还可以抛出异常
//         // it.throw("泰裤辣");
//     });
// });

// 简单实现一下 co 库：能将 generator 函数变成一个 promise 返回

const co = (it) => {
    return new Promise((resolve, reject) => {
        // 异步迭代靠的是回调函数
        function next(data) {
            let { value, done } = it.next(data);
            if (!done) {
                // value 可能不是promise，需要包装一下
                Promise.resolve(value).then(next, reject);
            } else {
                resolve(value);
            }
        }
        // 先调用一次
        next();
    });
};

co(read()).then((data) => {
    console.log("data---->", data);
});

// async + await = generator + co
// async await 替换掉了 generator 和 co，默认 async 函数执行后返回的就是一个 promise

// [co 库](https://github.com/tj/co)

// 推荐阅读阮一峰大佬的：[co 函数库的含义和用法](https://www.ruanyifeng.com/blog/2015/05/co.html)
