const Koa = require("koa");
const path = require("path");
const static = require("koa-static");
// 使用自己实现的 koa-bodyparser
const bodyParser = require("./kaimo-koa-bodyparser");
const app = new Koa();
app.use(static(path.resolve(__dirname, "public")));
// 传入需要保存上传文件的文件夹
app.use(bodyParser(path.resolve(__dirname, "upload")));

app.use(async (ctx, next) => {
    console.log(ctx.path, ctx.method);
    if (ctx.path == "/login" && ctx.method === "POST") {
        ctx.body = ctx.request.body;
        console.log("ctx.body-------->", ctx.body);
    } else {
        await next();
    }
});

app.on("error", function (err) {
    console.log("error----->", err);
});

app.listen(3000);
