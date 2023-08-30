const Koa = require("./kaimo-koa");
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = "Hello kaimo Koa";
    console.log("url---->", ctx.request.url);
    console.log("path---->", ctx.request.path);
    console.log("query---->", ctx.request.query);
});

app.on("error", (err) => {
    console.log(err);
});

app.listen(3000);
