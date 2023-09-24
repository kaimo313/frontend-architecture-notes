上一节实现了 express 的中间件，这一节来实现错误处理中间件

执行某一步出错了，统一规定调用 next 传递的参数就是错误信息

```js
const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
    console.log("中间件1");
    // next();
    next("中间件1出错了");
});

app.use("/", (req, res, next) => {
    console.log("中间件2");
    next();
    // next("中间件2出错了");
});

app.use("/", (req, res, next) => {
    console.log("中间件3");
    next();
    // next("中间件3出错了");
});

app.get(
    "/",
    (req, res, next) => {
        console.log("路由1");
        next();
    },
    (req, res, next) => {
        res.end("出错了 *****");
    }
);

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});

```

然后去访问：`http://localhost:3000/`

错误处理中间价，里面必须要有 4 个 参数（取函数的长度），放到栈的最底下

```js
app.use((err, req, res, next) => {
    res.end(err);
})
```
