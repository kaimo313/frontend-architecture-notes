const fs = require("fs").promises;

// fs.readFile("./file/name.txt", "utf-8").then((data) => {
//     console.log("data--name-->", data);
// });

// fs.readFile("./file/age.txt", "utf-8").then((data) => {
//     console.log("data--age-->", data);
// });

// 检查是否是 promise，不使用 instanceof 的原因是因为可能是别人实现的类
const isPromise = (value) => typeof value.then === "function";

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        // 遍历数组 依次拿到执行结果，需要将索引跟数据对应起来
        let arr = [];
        let index = 0;
        const processData = (key, data) => {
            arr[key] = data;
            // 不能使用数组的长度来计算，写成 arr.length === promises.length 是有问题的，应该采用 index 自增的方式处理
            if (++index === promises.length) {
                resolve(arr);
            }
        };
        for (let i = 0; i < promises.length; i++) {
            let result = promises[i];
            if (isPromise(result)) {
                result.then((data) => {
                    processData(i, data);
                }, reject);
            } else {
                processData(i, result);
            }
        }
    });
};

// 有一个失败就会失败，由于是并发，promise 缺陷默认无法中断，只是不采用返回的结果
Promise.all([fs.readFile("./file/name.txt", "utf-8"), fs.readFile("./file/age.txt", "utf-8"), 666])
    .then((data) => {
        console.log("data--name--age-->", data);
    })
    .catch((err) => {
        console.log("err---->", err);
    });
