// 观察者模式：会有两个类，观察者会被存储到被观察者中，如果被观察者状态变化，会主动通知观察者，调用观察者的更新方法
// 发布订阅好处：可以解耦合

const EventEmitter = require("events");

// 使用自己实现的 events 类
// const EventEmitter = require("./39/events.js");

const util = require("util");
function Man() {}
// 继承
util.inherits(Man, EventEmitter);
// 创建实例
let man = new Man();

// 发布订阅
const sleep = (name) => console.log(name, "睡");
const eat = (name) => console.log(name, "吃");

// newListener 固定写法，每次绑定都会触发，可以用于判断监听了哪些事件
// [https://nodejs.org/dist/latest-v18.x/docs/api/events.html#event-newlistener](https://nodejs.org/dist/latest-v18.x/docs/api/events.html#event-newlistener)
// man.on("newListener", (type) => {
//     console.log("newListener---->", type);
//     if (type === "唱跳rap篮球") {
//         // 在当前同步代码执行完毕后触发事件
//         process.nextTick(() => {
//             man.emit(type, "小坤");
//         });
//     }
// });

// // newListener 测试
// man.on("唱跳rap篮球", sleep);
// man.once("唱跳rap篮球", eat);

// // on 测试
// man.on("唱跳rap篮球", sleep);
// man.on("唱跳rap篮球", eat);
// man.emit("唱跳rap篮球", "小坤");

// // off 测试
// man.on("唱跳rap篮球", sleep);
// man.off("唱跳rap篮球", sleep);
// man.emit("唱跳rap篮球", "小坤");

// // once 测试
// man.once("唱跳rap篮球", eat);
// man.emit("唱跳rap篮球", "小坤");
// man.emit("唱跳rap篮球", "小坤");
