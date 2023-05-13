const KaimoPromise = require("./9/kaimo-promise.js");

// 调用 p1.resolve() => p1.then(data)
//      p2.resolve() => p2.then(data)
let p1 = new KaimoPromise((resolve, reject) => {
    resolve("kaimo666");
});

let p2 = p1.then((data) => {
    console.log("p1---resolve--->", data);
    return "kaimo777";
});

p2.then((data) => {
    console.log("p2---resolve--->", data);
});
