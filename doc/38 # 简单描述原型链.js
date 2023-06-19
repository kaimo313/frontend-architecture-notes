// 基于事件驱动，node 中自己实现了一个发布订阅

// const EventEmitter = require("events");

// const event = new EventEmitter();
// console.log(event.__proto__);

// 实例的属性和方法（每个人都独有一份），原型上的属性和方法（所有人共享一个）

// 比如下面的 name 就是实例的属性，eat 就是原型上的方法

// function Man(name) {
//     this.name = name;
// }
// Man.prototype.eat = function () {
//     console.log("我他喵吃吃吃");
// };
// new Man("kaimo");
// new Man("kaimo313");

// 常用的继承策略：继承父类的原型链

// function Man() {}

// let man = new Man();

// console.log(man.__proto__ === Man.prototype); // true
// console.log(Man.prototype.__proto__ === Object.prototype); // true
// console.log(Object.prototype.__proto__); // null 对象的原型的 __proto__ 指向的是 null

// 继承父类的原型方法
// Man.prototype.__proto__ = EventEmitter.prototype; // 最早
// Man.prototype = Object.create(EventEmitter.prototype); // es5 版本
// Object.create 方式的原理
// function create(parentPrototype) {
//     function Fn() {}
//     Fn.prototype = parentPrototype;
//     return new Fn();
// }
// Object.setPrototypeOf(Man.prototype, EventEmitter.prototype); // es6 版本
// extends 语法：class Man extends EventEmitter

// let man = new Man();
// console.log(man.on);

// 使用 util 模块的 inherits 实现继承
// const EventEmitter = require("events");
// const util = require("util");
// function Man() {}

// util.inherits(Man, EventEmitter);

// let man = new Man();
// console.log(man.on);

// util.inherits 的底层实现

// function inherits(ctor, superCtor) {
//     Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
// }
