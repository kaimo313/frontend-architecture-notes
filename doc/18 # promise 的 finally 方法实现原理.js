// finally 表示不是最终的意思，而是无论如何都会执行的意思
// 如果返回一个 promise 会等待这个 promise 也执行完毕，如果是失败的 promise 会用它的失败原因传给下一个

// Promise.resolve("kaimo666")
//     .finally((data) => {
//         console.log("resolve--finally-->", data);
//     })
//     .then((data) => {
//         console.log("resolve--finally--then-->", data);
//     });

// Promise.reject("kaimo777")
//     .finally((data) => {
//         console.log("reject--finally-->", data);
//     })
//     .catch((err) => {
//         console.log("reject--finally--err-->", err);
//     });

// 实现 finally 方法

Promise.prototype.finally = function (callback) {
    // Promise.resolve(callback()) 包装一下 callback()，让其始终是一个 promise，有 then 方法
    return this.then(
        (value) => {
            // 成功就需要把成功的值传递下去
            return Promise.resolve(callback()).then(() => value);
        },
        (reason) => {
            // 失败就需要把失败的原因抛出去
            return Promise.resolve(callback()).then(() => {
                throw reason;
            });
        }
    );
};

Promise.resolve("kaimo888")
    .finally((data) => {
        console.log("finally-->", data);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("okk");
            }, 3000);
        });
    })
    .then((data) => {
        console.log("then-->", data);
    })
    .catch((err) => {
        console.log("err-->", err);
    });
