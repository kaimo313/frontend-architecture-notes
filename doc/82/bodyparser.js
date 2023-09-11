const Koa = require("koa");
// const bodyParser = require("koa-bodyparser");
// 使用自己实现的 koa-bodyparser
const bodyParser = require("./kaimo-koa-bodyparser");
const app = new Koa();
app.use(bodyParser());

app.use((ctx, next) => {
    // 路径是 /login get 方式
    // ctx 包含了 request response req res
    console.log(ctx.path, ctx.method);
    if (ctx.path == "/login" && ctx.method === "GET") {
        ctx.body = `
            <form action="/login" method="post">
                用户名：<input type="text" name="username"/><br/>
                密码：<input type="password" name="password"/><br/>
                <button>提交</button>
            </form>
        `;
    } else {
        return next();
    }
});

app.use(async (ctx, next) => {
    console.log(ctx.path, ctx.method);
    if (ctx.path == "/login" && ctx.method === "POST") {
        ctx.body = ctx.request.body;
    } else {
        await next();
    }
});

app.on("error", function (err) {
    console.log("error----->", err);
});

app.listen(3000);
