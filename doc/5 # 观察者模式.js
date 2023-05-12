/**
 * 观察者模式
 *  1、有观察者，肯定也有被观察者
 *  2、观察者需要放到被观察者中
 *  3、被观察者的状态发生变化需要通知观察者
 *  4、内部也是基于发布订阅模式去收集观察者
 * */

// 被观察者
class Subject {
    constructor(name) {
        this.name = name;
        // 观察者列表
        this.observers = [];
    }
    // 添加观察者
    addObserver(o) {
        this.observers.push(o);
    }
    // 移除观察者
    removeObserver(o) {
        let index = this.observers.indexOf(o);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    // 通知所有观察者
    notify() {
        this.observers.forEach((o) => o.updade(this));
    }
}

// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }
    updade(subject) {
        console.log(`【${subject.name}】发布了博客，当前【${this.name}】被通知了`);
    }
}

let subject = new Subject("凯小默");

let observer1 = new Observer("小明");
let observer2 = new Observer("小红");

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.notify();

subject.removeObserver(observer1);
subject.notify();
