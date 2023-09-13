const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

router.get("/", async (ctx, next) => {
    ctx.body = "hello";
});

router.post("/add", async (ctx, next) => {
    ctx.body = "add";
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods()); // 路由的装载

app.listen(3000);
