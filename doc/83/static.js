const Koa = require("koa");
const path = require("path");
const bodyParser = require("koa-bodyparser");
// 使用自己实现的中间件
// const static = require("koa-static");
const static = require("./kaimo-koa-static");
const app = new Koa();
app.use(bodyParser());
app.use(static(__dirname));
app.use(static(path.resolve(__dirname, "public")));

app.use((ctx, next) => {
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
