const Koa = require("koa");

const app = new Koa();

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
        await new Promise((resolve, reject) => {
            const arr = [];
            ctx.req.on("data", function (chunk) {
                arr.push(chunk);
            });
            ctx.req.on("end", function () {
                const result = Buffer.concat(arr).toString();
                console.log("result---->", result);
                ctx.body = result;
                resolve();
            });
        });
    } else {
        await next();
    }
});

app.on("error", function (err) {
    console.log("error----->", err);
});

app.listen(3000);
