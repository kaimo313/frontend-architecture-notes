const fs = require("fs");

// function read(filename) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filename, "utf-8", function (err, data) {
//             if (err) reject(err);
//             resolve(data);
//         });
//     });
// }
const KaimoPromise = require("./14/kaimo-promise.js");

function read(filename) {
    let dfd = KaimoPromise.defer();
    fs.readFile(filename, "utf-8", function (err, data) {
        if (err) dfd.reject(err);
        dfd.resolve(data);
    });
    return dfd.promise;
}

read("./file/name.txt")
    .then((data) => {
        return data;
    })
    .then(
        (data) => {
            console.log("success----->", data);
        },
        (err) => {
            console.log("err----->", err);
        }
    );
