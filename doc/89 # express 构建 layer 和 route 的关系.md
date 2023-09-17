上一节实现了实现应用和路由的分离，这一节来构建 layer 和 route 的关系

先看个例子如下：路由中间件，将处理的逻辑拆分成一个个的模块

```js
const express = require("express");
const app = express();

app.get(
    "/",
    (req, res, next) => {
        console.log(1);
        next();
    },
    (req, res, next) => {
        console.log(11);
        next();
    },
    (req, res, next) => {
        console.log(111);
        next();
    }
);

app.get("/", (req, res, next) => {
    console.log(2);
    res.end("end");
});

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
```

下面构建 layer 和 route 的关系
