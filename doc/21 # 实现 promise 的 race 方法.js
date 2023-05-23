const fs = require("fs").promises;

// 检查是否是 promise，不使用 instanceof 的原因是因为可能是别人实现的类
const isPromise = (value) => typeof value.then === "function";

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            let result = promises[i];
            if (isPromise(result)) {
                result.then(resolve, reject);
            } else {
                resolve(result);
            }
        }
    });
};

// 赛跑，谁跑的快用谁（比如多个接口请求，用快的那个）
// Promise.race([fs.readFile("./file/name.txt", "utf-8"), fs.readFile("./file/age.txt", "utf-8")])
//     .then((data) => {
//         console.log("data--name--age-->", data);
//     })
//     .catch((err) => {
//         console.log("err---->", err);
//     });

// 中断 promise 一个 promise 正在走向成功 3s 之后成功，如果超过了 2s 就认为失败了
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("ok 成功了");
    }, 3000);
});
// 通过 race 方法实现一个中断请求的包装方法
const wrap = (promise) => {
    let abort;
    // 构建一个新的 promise，跟传进来的竞赛
    let newP = new Promise((resolve, reject) => {
        abort = reject;
    });
    // 有一个失败就失败了
    let p = Promise.race([promise, newP]);
    p.abort = abort;
    return p;
};
let p = wrap(promise);
p.then(
    (data) => {
        console.log("data---->", data);
    },
    (err) => {
        console.log("err---->", err);
    }
);
setTimeout(() => {
    // 如果超过 2s 中断请求，中断就会触发，wrap 里构建的新的 promise 的 reject 方法
    p.abort("promise 超时");
}, 2000);
