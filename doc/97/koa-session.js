const Koa = require("koa");
const Router = require("@koa/router");
const session = require("koa-session");

const app = new Koa();
let router = new Router();
app.use(session({}, app));
app.use(router.routes());

app.keys = ["kaimo"];

router.get("/visit", async (ctx, next) => {
    ctx.session.visit = ctx.session.visit || 0;
    ctx.session.visit++;
    ctx.body = `你有${ctx.session.visit}次机会`;
});

app.listen(3000);

console.log("Server running at http://127.0.0.1:3000/");
