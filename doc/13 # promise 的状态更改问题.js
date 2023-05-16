const KaimoPromise = require("./13/kaimo-promise.js");

let p1 = new KaimoPromise((resolve, reject) => {
    resolve("kaimo");
});

let promise2 = p1.then((data) => {
    console.log("p1---resolve--->", data);
    return new KaimoPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                new KaimoPromise((resolve, reject) => {
                    setTimeout(() => {
                        resolve("kaimo666");
                    }, 1000);
                })
            );
        }, 1000);
    });
});

promise2.then(
    (data) => {
        console.log("p2---resolve--->", data);
    },
    (err) => {
        console.log("p2---reject--->", err);
    }
);
