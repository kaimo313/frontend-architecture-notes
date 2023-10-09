const Koa = require("koa");
const Router = require("@koa/router");
const bodyparser = require("koa-bodyparser");
const jwt = require("jwt-simple");

const app = new Koa();
let router = new Router();
app.use(bodyparser());
app.use(router.routes());

router.post("/login", async (ctx, next) => {
    let { username, password } = ctx.request.body;
    if (username === "admin" && password === "123456") {
        let token = jwt.encode(username, "kaimo");
        ctx.body = {
            err: 0,
            username,
            token
        };
    }
});
router.get("/validate", async (ctx, next) => {
    let authorization = ctx.headers.authorization;
    try {
        let r = jwt.decode(authorization, "kaimo");
        ctx.body = {
            err: 0,
            username: r
        };
    } catch (error) {
        ctx.body = {
            err: 1,
            message: error
        };
    }
});

app.listen(3000);

console.log("Server running at http://127.0.0.1:3000/");
