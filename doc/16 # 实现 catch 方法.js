const KaimoPromise = require("./16/kaimo-promise.js");

new KaimoPromise((resolve, reject) => {
    reject("kaimo");
})
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log("err----->", err);
    });
