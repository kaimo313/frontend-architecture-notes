const express = require("./kaimo-express");
const app = express();

app.use("/", (req, res, next) => {
    console.log("中间件1");
    next();
    // next("中间件1出错了");
});

app.use("/", (req, res, next) => {
    console.log("中间件2");
    // next();
    next("中间件2出错了");
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

// 错误处理中间价
app.use((err, req, res, next) => {
    console.log("错误处理中间价----->", err);
    res.end(err);
});

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
