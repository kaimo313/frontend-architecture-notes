const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = "Hello kaimo Koa";
});

app.on("error", (err) => {
    console.log(err);
});

app.listen(3000);
