const Koa = require("koa");
const Router = require("@koa/router");
const uuid = require("uuid");

const app = new Koa();
let router = new Router();
app.use(router.routes());

app.keys = ["kaimo"];

const session = {};
const cardName = "kaimo.sid"; // 卡的名字，标识店铺名

router.get("/visit", async (ctx, next) => {
    let cardId = ctx.cookies.get(cardName);
    if (cardId && session[cardId]) {
        session[cardId].count--;
        ctx.body = `你有${session[cardId].count}次机会`;
    } else {
        let cardId = uuid.v4();
        session[cardId] = { count: 3 };
        ctx.cookies.set(cardName, cardId);
        ctx.body = `你有${session[cardId].count}次机会`;
    }
});

app.listen(3000);

console.log("Server running at http://127.0.0.1:3000/");
