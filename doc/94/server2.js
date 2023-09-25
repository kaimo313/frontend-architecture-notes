const express = require("./kaimo-express");
const userRouter = require("./routes2/userRouter");
const articleRouter = require("./routes2/articleRouter");
const app = express();

// 对用户进行操作，对文章进行操作

app.use("/user", userRouter);
app.use("/article", articleRouter);

app.use("/", (req, res, next) => {
    res.end("kaimo");
});

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
