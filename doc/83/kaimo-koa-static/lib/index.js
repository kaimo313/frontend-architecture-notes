const path = require("path");
const fs = require("fs").promises;
const mime = require("mime");

console.log("使用的是 kaimo-koa-static 中间件");
module.exports = function static(root) {
    return async (ctx, next) => {
        let filePath = path.join(root, ctx.path);
        try {
            let statObj = await fs.stat(filePath);
            // 判断是否是文件
            if (statObj.isFile()) {
                ctx.type = mime.getType(filePath) + ";charset=utf-8";
                ctx.body = await fs.readFile(filePath);
            } else {
                await next();
            }
        } catch (e) {
            await next();
        }
    };
};
