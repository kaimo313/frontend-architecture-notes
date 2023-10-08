const Koa = require("koa");
const Router = require("@koa/router");
const crypto = require("crypto");

const app = new Koa();
let router = new Router();
app.use(router.routes());

app.keys = ["kaimo"];

router.get("/visit", async (ctx, next) => {
    let visit = ctx.cookies.get("visit") || 0;
    visit++;
    ctx.cookies.set("visit", `${visit}`, {
        httpOnly: true,
        signed: true
    });
    ctx.body = `你当前访问次数${visit}，签名：${crypto.createHmac("sha1", "kaimo").update(`visit=${visit}`).digest("base64")}`;
});

app.listen(3000);

console.log("Server running at http://127.0.0.1:3000/");
