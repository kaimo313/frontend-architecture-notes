const Koa = require("./kaimo-koa");

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
    console.log(1);
    console.time("kaimo");
    await next();
    ctx.body = "hello 1";
    console.log(2);
    console.timeEnd("kaimo");
});

app.use(async (ctx, next) => {
    console.log(3);
    await log();
    ctx.body = "hello 2";
    await next();
    console.log(4);
});

app.use(async (ctx, next) => {
    console.log(5);
    ctx.body = "hello 3";
    await next();
    console.log(6);
});

app.listen(3000);
