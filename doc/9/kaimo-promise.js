// promise 就是一个类
// 1. promise 有三个状态：成功态（resolve） 失败态（reject） 等待态（pending）（又不成功又不失败）
// 2. 用户自己决定失败的原因和成功的原因，成功和失败也是用户定义的
// 3. promise 默认执行器立即执行
// 4. promise 的实例都拥有一个 then 方法，一个参数是成功的回调，另一个是失败的回调
// 5. 如果执行函数时发生了异常也会执行失败的逻辑
// 6. 如果 promise 一旦成功就不能失败，反之亦然，只有等待态的时候才能去更新状态

const RESOLVE = "RESOLVE"; // 成功态
const REJECT = "REJECT"; // 失败态
const PENDING = "PENDING"; // 等待态

class KaimoPromise {
    constructor(executor) {
        this.status = PENDING;
        // value 是任意合法的 Javascript 值，（包括 undefined，thenable, promise）。
        this.value = undefined;
        // reason 是表示 promise 为什么被 rejected 的值
        this.reason = undefined;
        // 存放成功回调
        this.onResolveCallbacks = [];
        // 存放失败回调
        this.onRejectCallbacks = [];
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVE;
                this.onResolveCallbacks.forEach((fn) => fn());
            }
        };
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECT;
                this.onRejectCallbacks.forEach((fn) => fn());
            }
        };
        try {
            // 立即执行
            executor(resolve, reject);
        } catch (error) {
            // 处理错误异常
            reject(error);
        }
    }

    // 1. promise 成功和失败的回调的返回值可以传递到外层的下一个 then
    // 2. promise 返回值情况
    //  2.1. 如果返回的是普通的值的话：传递到下一次的成功中（不是错误也不是 promise 就是普通值）
    //  2.2. 如果返回的是错误的情况：一定会走到下一次的失败中
    //  2.3. 如果返回的是 promise 的情况：会采用 promise 的状态，决定下一步是走成功还是失败
    // 3. 错误处理：如果离自己最近的 then 没有错误处理（没有写错误函数）会向下找
    // 4. 每次执行完 `promise.then` 方法后返回的都是一个新的 promise （promise 一旦成功或者失败都不能去修改状态）

    // promise 必须提供 then 方法来存取它当前或最终的值或者原因。
    // then 接收两个参数：onFulfilled 和 onRejected
    then(onFulfilled, onRejected) {
        // 实现链式调用
        let kaimoPromise = new KaimoPromise((resolve, reject) => {
            if (this.status === RESOLVE) {
                let x = onFulfilled(this.value);
                resolve(x);
            }
            if (this.status === REJECT) {
                onRejected(this.reason);
            }
            if (this.status === PENDING) {
                this.onResolveCallbacks.push(() => {
                    onFulfilled(this.value);
                });
                this.onRejectCallbacks.push(() => {
                    onRejected(this.reason);
                });
            }
        });

        return kaimoPromise;
    }
}

module.exports = KaimoPromise;
