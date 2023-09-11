## 静态服务中间件：koa-static

中间件可以决定是否向下执行，如果自己可以处理，那么直接处理完毕结束，如果自己处理不了，next 方法会继续向下执行

新建 public 文件夹，里面添加 `index.html、index.css` 文件


[koa-static](https://www.npmjs.com/package/koa-static)

```bash
npm i koa koa-static
```

用法：

```js
const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
 
// $ GET /package.json
app.use(serve('.'));
 
// $ GET /hello.txt
app.use(serve('test/fixtures'));
 
// or use absolute paths
app.use(serve(__dirname + '/test/fixtures'));
 
app.listen(3000);
 
console.log('listening on port 3000');
```

业务代码 `static.js` 中使用 `koa-static`


启动服务，访问 `http://localhost:3000/index.html`

```bash
nodemon static.js
```

下面实现自己的 `koa-static`，需要安装 mime