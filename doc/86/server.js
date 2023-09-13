const express = require("./kaimo-express");
const app = express();

// 调用回调时 会将原生的 req 和 res 传入（req，res 在内部也被扩展了）
// 内部不会将回调函数包装成 promise
app.get("/", (req, res) => {
    res.end("ok");
});

app.get("/add", (req, res) => {
    res.end("add");
});

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
