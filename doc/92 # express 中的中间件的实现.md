上一节实现 express 的优化处理，这一节来实现 express 的中间件

中间件的特点：

- 可以决定是否向下执行
- 可以拓展属性和方法
- 可以权限校验
- 中间件的放置顺序在路由之前

中间件基于路由，只针对路径拦截，下面是中间件的匹配规则：

1. 路径为 `/` 表示任何路径都能匹配到
2. 如果以这个路径开头，则匹配
3. 和路由的路径一样，也可以匹配

```js
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
```

控制台执行下面命令：

```bash
curl -v -X POST http://localhost:3000/
```

然后去访问：`http://localhost:3000/`
