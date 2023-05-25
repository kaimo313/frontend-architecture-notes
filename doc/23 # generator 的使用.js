// 1、类数组：长的像数组

const likeArray = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    length: 4
};

// 拓展运算符：原理就是遍历这个对象 将结果放到数组中，这个数组必须有个遍历器。（[...new Set()]）
// [...likeArray]; // likeArray是类数组并且没有遍历器不能迭代遍历，执行会报错：object is not iterable

// Array.from(likeArray); // 可以将类数组转为数组：[ 'a', 'b', 'c', 'd' ]

// 下面实现 likeArray 的迭代器，数组里面是有 Symbol.iterator 的
// likeArray[Symbol.iterator] = function () {
//     // 返回一个遍历器对象，需要有一个 next 方法，不停的调用
//     let i = 0;
//     return {
//         // 这里用箭头函数让里面的this指向 likeArray
//         next: () => {
//             return {
//                 value: this[i],
//                 // done 为 true 表示完成
//                 done: i++ === this.length
//             };
//         }
//     };
// };
// console.log([...likeArray]);

// 2、使用 generator 改造 likeArray 的迭代器
// * 表示该函数是 generator 函数，generator 生成器生成的叫遍历器(迭代器)
// likeArray[Symbol.iterator] = function* () {
//     let i = 0;
//     while (i !== this.length) {
//         // yield 表示产出，固定语法，配合着 * 来使用
//         yield this[i++];
//     }
// };
// console.log([...likeArray]);

// 3、generator 的使用

// 普通函数默认会从头到尾执行没有暂停的功能
// generator 函数是 es6 提供的语法，如果碰到 yield 就会暂停执行（redux-saga、koa1 中有用到）

// function* read() {
//     yield 1;
//     yield 2;
//     yield 3;
// }

// let it = read(); // it 就是迭代器，迭代器上面有个 next 方法
// console.log(it.next()); // { value: 1, done: false }
// console.log(it.next()); // { value: 2, done: false }
// console.log(it.next()); // { value: 3, done: false }
// console.log(it.next()); // { value: undefined, done: true }
// console.log(it.next()); // { value: undefined, done: true }

// 可以自己循环
// let flag = false;
// do {
//     let { value, done } = it.next();
//     flag = done;
//     console.log("value--->", value);
// } while (!flag);

// 4、yield 可以有返回值

// function* read() {
//     let a = yield 1;
//     console.log("a---->", a);
//     let b = yield 2;
//     console.log("b---->", b);
//     let c = yield 3;
//     console.log("c---->", c);
//     return c;
// }

// let it = read();
// // next 是给上一次 yield 传参
// it.next("k1"); // 第一次传参没有意义，上一次没有 yield
// it.next("k2");
// it.next("k3");
// it.next("k4");

// 5、generator 的应用

const fs = require("fs").promises;

// 代码更像是同步的，但是执行还是异步的
function* read() {
    try {
        let name = yield fs.readFile("./file/name.txt", "utf-8");
        let age = yield fs.readFile("./file/age.txt", "utf-8");
        return { name, age };
    } catch (error) {
        console.log("error---->", error);
    }
}

let it = read();
let { value, done } = it.next();
value.then((data1) => {
    console.log("name---->", data1);
    let { value, done } = it.next(data1);
    value.then((data2) => {
        // let { value, done } = it.next(data2);
        // console.log("age---->", data2);
        // console.log("return---->", value);
        // 还可以抛出异常
        it.throw("泰裤辣");
    });
});
