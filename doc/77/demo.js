const Koa = require("koa");

const app = new Koa();

const log = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("kaimo313");
            resolve();
        }, 3000);
    });
};

app.use(async (ctx, next) => {
    console.time("kaimo");
    await next();
    ctx.body = "hello 1";
    console.timeEnd("kaimo");
});

app.use(async (ctx, next) => {
    await log();
    ctx.body = "hello 2";
    return next();
});

app.use(async (ctx, next) => {
    ctx.body = "hello 3";
    return next();
});

app.listen(3000);
