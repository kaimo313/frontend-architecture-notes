const express = require("express");
const userRouter = require("./routes/userRouter");
const articleRouter = require("./routes/articleRouter");
const app = express();

// 对用户进行操作，对文章进行操作

app.use("/user", userRouter);
app.use("/article", articleRouter);

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
