## mvc

- model 数据
- view 视图
- controller 控制器

```bash
npm init -y
npm i koa koa-static koa-bodyparser koa-router koa-combine-routers ejs koa-views@6.2.3
```

加了`router.allowedMethods()` 中间件情况下，如果接口是 get 请求，而前端使用 post 请求，会返回 `405 Method Not Allowed`，提示方法不被允许 ，并在响应头有添加允许的请求方式（`Allow: POST`）；而在不加这个中间件这种情况下，则会返回 `404 Not Found` 找不到请求地址，并且响应头没有添加允许的请求方式 。

合并路由可以使用 `koa-combine-routers`，能将多个路由合并成一个路由使用 （跟 redux 里的 combineReducers 类似）

命中路径后，调用对应的控制器来处理