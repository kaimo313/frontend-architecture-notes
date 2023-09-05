const fs = require("fs");
const Koa = require("./kaimo-koa");
const app = new Koa();

app.use(async (ctx, next) => {
    // ctx.body = {
    //     kaimo: "313"
    // };
    ctx.body = fs.createReadStream("./test.txt");
});

app.listen(3000);
