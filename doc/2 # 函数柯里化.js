// 什么是函数柯里化

// 函数柯里化（Currying）是一种将接受多个参数的函数转换为一系列接受单一参数的函数的技术。
// 通过函数柯里化，我们可以将原来接受多个参数的函数，转换为一系列只接受单一参数的函数，每个函数接收一个参数，返回一个新函数，最后一个新函数返回最终结果。

function add(x, y, z) {
    return x + y + z;
}
console.log(add(1, 2, 3));

// 可以通过函数柯里化将其转换为一个接受单一参数的函数，并返回一个新的函数，直到所有参数都被传递完毕为止。

function curryingAdd(x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        };
    };
}

console.log(curryingAdd(1)(2)(3));

// 函数柯里化本质上是一种闭包的应用，通过保留原函数的参数，生成一个新函数，在新函数中再次调用原函数并传递参数，最终得到结果。

// 例子：判断变量的类型

// 常用的判断类型的方法有四种

// 1、typeof 不能判断对象类型 （typeof [] 跟 typeof {} 都是 'object'）
// 2、constructor 可以找到这个变量时通过谁构造出来的
// 3、instanceof 判断谁是谁的实例 __proto__
// 4、Object.prototype.toString.call() 不能细分谁是谁的实例

function isType(type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}

console.log(isType("Array", []));

// function isType2(type) {
//     return function (value) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`;
//     };
// }

// // 细分方法
// let isArray = isType2("Array");

// console.log(isArray({}));

// 如何通过一个柯里化函数实现通用的柯里化方法？

const currying = (fn, arr = []) => {
    // 函数的长度 length 属性指明函数的形参个数。
    let len = fn.length;
    return function (...args) {
        let newArr = [...arr, ...args];
        if (newArr.length < len) {
            // 递归
            return currying(fn, newArr);
        } else {
            return fn(...newArr);
        }
    };
};
let isArray2 = currying(isType)("Array");
console.log("isArray2----------");
console.log(isArray2("kaimo"));
console.log(isArray2([]));

let isString2 = currying(isType)("String");
console.log("isString2----------");
console.log(isString2("kaimo"));
console.log(isString2([]));

let add2 = currying(add);
console.log("add2----------");
console.log(add2(1)(2)(3));
