// 1. promise 调用 then 方法是可能当前的 promise 并没有成功，而是处于 pending 状态
// 2. 如果当前状态是 pending 时，我们需要将成功的回调和失败的回调存放起来，稍后调用 resolve 跟 reject 的时候重新执行（采用发布订阅的模式处理）

let KaimoPromise = require("./7/kaimo-promise.js");

let promise = new KaimoPromise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        // throw new Error("异常");
        resolve("成功");
        // reject("失败");
    }, 1000);
});
console.log(2);

promise.then(
    (data) => {
        console.log("success1", data);
    },
    (err) => {
        console.log("failed1", err);
    }
);

promise.then(
    (data) => {
        console.log("success2", data);
    },
    (err) => {
        console.log("failed2", err);
    }
);
