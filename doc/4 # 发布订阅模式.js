/**
 * 发布订阅模式分成两个部分：订阅和发布没有明显的关联
 *  on(订阅)：就是把一些函数维护到一个数组中
 *  emit(发布)：就是让数组中的函数依次执行
 * */

let fs = require("fs");

let person = {};

let event = {
    arr: [],
    on(fn) {
        this.arr.push(fn);
    },
    emit() {
        this.arr.forEach((fn) => fn());
    },
};

event.on(function () {
    if (Object.keys(person).length === 2) {
        console.log("event--person--->", person);
    }
});

fs.readFile("./file/name.txt", "utf-8", function (err, data) {
    console.log("name.txt--->", err, data);
    person.name = data;
    event.emit();
});

fs.readFile("./file/age.txt", "utf-8", function (err, data) {
    console.log("age.txt--->", err, data);
    person.age = data;
    event.emit();
});
