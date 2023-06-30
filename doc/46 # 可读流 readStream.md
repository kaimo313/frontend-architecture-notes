上一节实现了文件拷贝功能，其中的读和写的操作都耦合在一起了，能不能实现一个方法，可以用一行搞定，这里涉及到流里的 pipe

## 流

流是有方向的，先读出来再写，node 中实现了流的模块（stream）

文件也想实现流，所以内部文件系统继承了 stream 模块

createReadStream 创建一个可读流（返回一个可读流对象），这个方法默认并不会读取内容：


```js
const fs = require("fs");
const path = require("path");

// createReadStream(path: fs.PathLike, options?: BufferEncoding | ReadStreamOptions | undefined): fs.ReadStream
// 内部的实现原理还是：fs.open  fs.read  fs.close
let rs = fs.createReadStream(path.resolve(__dirname, "./name.txt"), {
    flags: "r", // r 代表读取
    encoding: null, // 默认 null，就是 buffer 类型的
    mode: 0o666, // 模式：可读可写
    autoClose: true, // fs.close
    start: 0, // 0 - 8 包前又包后
    end: 8,
    highWaterMark: 3 // 每次读取的个数
});
console.log(rs);
```

为了多个异步方法可以解耦，可以采用发布订阅模式

可读流继承了 events 模块，这里的名字必须要叫 data，源码里写的就是 `rs.emit("data")`，如果监听了 data，内部会拼命读取文件的内容，触发对应的回调，默认会直到文件读取完毕

```js
const fs = require("fs");
const path = require("path");

let rs = fs.createReadStream(path.resolve(__dirname, "./name.txt"), {
    flags: "r", // r 代表读取
    encoding: null, // 默认 null，就是 buffer 类型的
    mode: 0o666, // 模式：可读可写
    autoClose: true, // fs.close
    start: 0, // 0 - 8 包前又包后
    end: 8,
    highWaterMark: 3 // 每次读取的个数
});

let bufferArr = [];
// 监听 open（文件流特殊的事件，普通流没有）
rs.on("open", (fd) => {
    console.log("open---->", fd);
});
// 监听 data
rs.on("data", (data) => {
    console.log("data---->", data);
    bufferArr.push(data);
    // rs.pause 可以让可读流暂停触发 data 事件
    rs.pause();
    console.log("pause---->暂停");
    // 再次触发 data 事件，可以使用 rs.resume
    setTimeout(() => {
        console.log("过 2s 再次触发 data 事件");
        rs.resume();
    }, 2000);
});
// 监听 end
rs.on("end", () => {
    console.log("end---->", Buffer.concat(bufferArr).toString());
});
// 监听 error
rs.on("error", (err) => {
    console.log("err---->", err);
});
// 监听 close （文件流特殊的事件，普通流没有）
rs.on("close", () => {
    console.log("close---->");
});

```