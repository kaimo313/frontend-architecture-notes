// 多个异步请求 如何同时获取最终结果

let fs = require("fs");

let person = {};

// let index = 0;
// const cb = () => {
//     if (++index === 2) {
//         console.log("person--->", person);
//     }
// };

function after(times, callback) {
    // 闭包函数：函数的定义的作用域跟函数执行的作用域不在同一个作用域下
    return function () {
        if (--times === 0) {
            callback();
        }
    };
}

const cb = after(2, function () {
    console.log("after--person--->", person);
});

fs.readFile("./file/name.txt", "utf-8", function (err, data) {
    console.log("name.txt--->", err, data);
    person.name = data;
    cb();
});

fs.readFile("./file/age.txt", "utf-8", function (err, data) {
    console.log("age.txt--->", err, data);
    person.age = data;
    cb();
});
