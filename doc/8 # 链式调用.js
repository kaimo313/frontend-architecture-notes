const fs = require("fs");

// 地狱回调问题 （err frist 错误第一，异步方法无法通过try catch 捕获异常）
// fs.readFile("./file/name.txt", "utf-8", function (err, data) {
//     console.log("name.txt--->", err, data);
//     if (!err) {
//         fs.readFile("./file/age.txt", "utf-8", function (err, data) {
//             console.log("age.txt--->", err, data);
//         });
//     }
// });

function read(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf-8", function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}

// 1. promise 成功和失败的回调的返回值可以传递到外层的下一个 then
// 2. promise 返回值情况
//  2.1. 如果返回的是普通的值的话：传递到下一次的成功中（不是错误也不是 promise 就是普通值）
//  2.2. 如果返回的是错误的情况：一定会走到下一次的失败中
//  2.3. 如果返回的是 promise 的情况：会采用 promise 的状态，决定下一步是走成功还是失败
// 3. 错误处理：如果离自己最近的 then 没有错误处理（没有写错误函数）会向下找
// 4. 每次执行完 `promise.then` 方法后返回的都是一个新的 promise （promise 一旦成功或者失败都不能去修改状态）

read("./file/name.txt")
    .then((data) => {
        // return 123;
        // return read("./file/age.txt");
        throw new Error("接口异常");
    })
    .then(
        (data) => {
            console.log("success----->", data);
        },
        (err) => {
            console.log("err----->", err);
        }
    );
