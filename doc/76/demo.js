const Koa = require("./kaimo-koa");
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = "Hello kaimo Koa";
    console.log("url---->", ctx.request.url);
    console.log("path---->", ctx.request.path);
    console.log("query---->", ctx.request.query);
    // ctx.__proto__.__proto__ === proto
    console.log("ctx.url---->", ctx.url);
    console.log("ctx.path---->", ctx.path);
    console.log("ctx.query---->", ctx.query);
    // ctx.body => ctx.response.body
    console.log("ctx.response.body---->", ctx.response.body);
});

app.on("error", (err) => {
    console.log(err);
});

app.listen(3000);
