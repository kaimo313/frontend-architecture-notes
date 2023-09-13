// 整合路由
let combineRoutes = require("koa-combine-routers");

let artilceRouter = require("./articleRouter");
let userRouter = require("./userRouter");

module.exports = combineRoutes(artilceRouter, userRouter);
