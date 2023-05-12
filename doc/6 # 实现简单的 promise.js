// promise A+ 规范：https://promisesaplus.com/

// promise es6已经内部实现了， ie 不兼容 promise，需要 polyfill es-promise

// 为什么会产生 promise，它解决了什么问题？

// 1. 过个异步请求并发（希望同步最终结果）Promise.all
// 2. 链式异步请求问题（上一个的输出是下一个的输入）Promise的链式调用可以解决这个问题
// 3. 缺陷：还是基于回调

let KaimoPromise = require("./6/kaimo-promise.js");

let promise = new KaimoPromise((resolve, reject) => {
    console.log(1);
    // throw new Error("异常");
    resolve("成功");
    // reject("失败");
});
console.log(2);

promise.then(
    (data) => {
        console.log("success", data);
    },
    (err) => {
        console.log("failed", err);
    }
);
