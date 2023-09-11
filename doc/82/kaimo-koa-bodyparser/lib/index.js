const querystring = require("querystring");
console.log("使用的是 kaimo-koa-bodyparser 中间件");
// 中间件的功能可以扩展属性、方法
module.exports = function () {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            const arr = [];
            ctx.req.on("data", function (chunk) {
                arr.push(chunk);
            });
            ctx.req.on("end", function () {
                if (ctx.get("content-type") === "application/x-www-form-urlencoded") {
                    const result = Buffer.concat(arr).toString();
                    console.log("kaimo-koa-bodyparser-result---->", result);
                    ctx.request.body = querystring.parse(result);
                }
                resolve();
            });
        });
        await next(); // 完成后需要继续向下执行
    };
};
