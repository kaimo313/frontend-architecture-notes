## 准备工作

安装依赖

```bash
npm init -y
npm i koa
```


koa 文档：[https://koajs.cn/#](https://koajs.cn/#)

koa 中不能用回调的方式来实现，因为 async 函数执行的时候不会等待回调完成

```js
app.use(async (ctx, next) => {
    console.log(ctx.path, ctx.method);
    if (ctx.path == "/login" && ctx.method === "POST") {
        const arr = [];
        ctx.req.on("data", function (chunk) {
            arr.push(chunk);
        });
        ctx.req.on("end", function () {
            const result = Buffer.concat(arr).toString();
            console.log("result---->", result);
            ctx.body = result;
        });
    } else {
        next();
    }
});
```

koa 中所有的异步都必须是 promise，只有 promise 才有等待效果，必须所有的 next 方法前需要有 await、return 否则没有等待效果

```js
app.use(async (ctx, next) => {
    console.log(ctx.path, ctx.method);
    if (ctx.path == "/login" && ctx.method === "POST") {
        await new Promise((resolve, reject) => {
            const arr = [];
            ctx.req.on("data", function (chunk) {
                arr.push(chunk);
            });
            ctx.req.on("end", function () {
                const result = Buffer.concat(arr).toString();
                console.log("result---->", result);
                ctx.body = result;
                resolve();
            });
        });
    } else {
        await next();
    }
});
```

实现一个表单提交功能 `server.js`：

## koa-bodyparser

下面使用 `koa-bodyparser` 简化逻辑，安装 `koa-bodyparser`，[https://www.npmjs.com/package/koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)

```bash
npm i koa-bodyparser
```

用法：

```js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
});
```

自己实现 `koa-bodyparser`
