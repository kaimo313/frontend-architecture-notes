const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
    if (req.query.kaimo == "313") {
        next();
    } else {
        res.send("没有权限访问");
    }
});

app.get("/", (req, res, next) => {
    res.end("get okk end");
});
app.post("/", (req, res, next) => {
    res.end("post okk end");
});

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
