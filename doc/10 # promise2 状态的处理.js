const KaimoPromise = require("./10/kaimo-promise.js");

// 调用 p1.resolve() => p1.then(data)
//      p2.resolve() => p2.then(data)
let p1 = new KaimoPromise((resolve, reject) => {
    // resolve("kaimo666");
    reject("GG");
});

let p2 = p1.then(
    (data) => {
        console.log("p1---resolve--->", data);
        // return "kaimo777";
        // throw new Error()
        // 如果返回的是一个promise，promise 内部应该调用 then 方法拿到它成功的 okk，在向下传递
        return new KaimoPromise((resolve, reject) => {
            setTimeout(() => {
                resolve("okk");
            }, 1000);
        });
    },
    (err) => {
        return "失败";
    }
);

p2.then(
    (data) => {
        console.log("p2---resolve--->", data);
    },
    (err) => {
        return "失败";
    }
);
