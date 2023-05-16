const KaimoPromise = require("./14/kaimo-promise.js");

let p = new KaimoPromise((resolve, reject) => {
    reject("kaimo");
});

p.then()
    .then()
    .then(
        (data) => {
            console.log("p2---resolve--->", data);
        },
        (err) => {
            console.log("p2---reject--->", err);
        }
    );
