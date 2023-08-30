## 实现基本的逻辑

新建自己的 kaimo-koa 文件夹，结构如下：

- lib
  - `application.js`：创建应用
  - `context.js`：上下文
  - `request.js`：koa 中自己实现的 request 的对象
  - `response.js`：koa 中自己实现的 response 的对象
- `package.json`：里面需要注意 main 字段，我们需要将 `lib/application.js` 作为入口

```json
{
    "name": "kaimo-koa",
    "version": "1.0.0",
    "description": "",
    "main": "lib/application.js",
    "directories": {
        "lib": "lib"
    },
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
```

## ctx 是什么东西？

ctx 中整合了 request 和 response，req 以及 res

- koa 自己实现的 request 和 response
- http 原生的 req 以及 res

`ctx.request.req.url` 跟 `ctx.req.url` 是等价的

`ctx.path` 就是去 `ctx.request.path` 上取的，`ctx.request` 内部使用了 url 模块进行解析
