const Koa = require("koa");
const views = require("koa-views");
const app = new Koa();
const router = require("./routes/index");

// 该中间件会在 ctx 上加上 render 方法 await ctx.render()
app.use(
    views(__dirname + "/views", {
        map: {
            html: "ejs" // 内部会自动引入 ejs 模块
        }
    })
);
app.use(router());

app.listen(3000);
