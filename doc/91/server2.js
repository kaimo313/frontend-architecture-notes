const express = require("./kaimo-express");
const app = express();

app.post("/", (req, res, next) => {
    res.end("post okk end");
});
app.put("/", (req, res, next) => {
    res.end("put okk end");
});
app.delete("/", (req, res, next) => {
    res.end("delete okk end");
});
app.options("/", (req, res, next) => {
    res.end("delete okk end");
});

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
