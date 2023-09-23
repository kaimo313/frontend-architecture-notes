const express = require("./kaimo-express");
const app = express();

app.use((req, res, next) => {
    console.log(1);
    next();
});
app.use((req, res, next) => {
    console.log(2);
    next();
});
app.use((req, res, next) => {
    console.log(3);
    next();
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
