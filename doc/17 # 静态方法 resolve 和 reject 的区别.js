// Promise.resolve 快速创建一个成功的promise

// Promise.reject 快速创建一个失败的promise

// 区别：resolve 会等待里面的 promise 执行完毕，reject 不会有等待效果

const KaimoPromise = require("./17/kaimo-promise.js");

KaimoPromise.resolve("kaimo666").then((data) => {
    console.log("KaimoPromise.resolve--->", data);
});

KaimoPromise.reject("kaimo777").then(
    (data) => {
        console.log("KaimoPromise.reject--->data", data);
    },
    (err) => {
        console.log("KaimoPromise.reject--->err", err);
    }
);

KaimoPromise.resolve(
    new KaimoPromise((resolve, reject) => {
        setTimeout(() => {
            resolve("kaimo313");
        }, 1000);
    })
).then((data) => {
    console.log("KaimoPromise.resolve--->", data);
});
