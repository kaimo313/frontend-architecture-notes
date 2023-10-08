## koa 里的 cookie 用法

koa 里内置了设置 cookie 的方法

```bash
npm init -y
npm i koa @koa/router
```

用法：

```js
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
```

## session

- session 基于 cookie 的，通过 cookie 的机制，制造一个服务端存储的空间
- session 比 cookie 安全，每次重启服务会丢失，可以用 redis 来存储 session

办卡例子：给一个固定的卡号

```bash
npm i uuid
```

```js
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
```

## koa-session 用法

Koa 的简单会话中间件。默认为基于 Cookie 的会话并支持外部存储。

[https://www.npmjs.com/package/koa-session](https://www.npmjs.com/package/koa-session)

```bash
npm i koa-session
```

```js
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
```
