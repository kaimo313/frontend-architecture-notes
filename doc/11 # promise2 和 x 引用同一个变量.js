const KaimoPromise = require("./11/kaimo-promise.js");

let p1 = new KaimoPromise((resolve, reject) => {
    resolve("kaimo");
});

let promise2 = p1.then((data) => {
    console.log("p1---resolve--->", data);
    // promise2 等待 promise2，这个时候 x 跟 promise2 是同一个就会死循环
    return promise2;
});

promise2.then(
    (data) => {
        console.log("p2---resolve--->", data);
    },
    (err) => {
        console.log("p2---reject--->", err);
    }
);
