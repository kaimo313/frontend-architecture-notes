koa 是对 http 的一个封装，实现了一个 node 框架，可以根据这个框架实现自己的 MVC 框架。

每个人用 koa 的方式都大不一样，无法做到约定性，所以才会有 egg 基于 koa 封装的约定性的框架。

## 安装

```bash
npm init -y
npm install koa
```

## 使用

主要用法就是 use，on，listen。

use 就是注册中间件，on 就是监听错误，listen 就是启动服务。

```js
const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = "Hello kaimo Koa";
});

app.on("error", (err) => {
    console.log(err);
});

app.listen(3000);

```

然后启动服务

```bash
nodemon demo.js
```

## koa 源码结构

koa 源码目录结构如下：

- lib
  - `application.js`：创建应用
  - `context.js`：上下文
  - `request.js`：koa 中自己实现的 request 的对象
  - `response.js`：koa 中自己实现的 response 的对象
