上一节实现 express 的请求处理，这一节来进行实现 express 的优化处理

1. 让 layer 提供 match 方法去匹配 pathname，方便拓展
2. 让 layer 提供 handle_request 方法，方便拓展
3. 利用第三方库 `methods` 批量生成方法
4. 性能优化问题
   - 进行路由懒加载，当进行 `get/post...` 请求时，或者 listen 时，才加载 route
   - layer 进行加速匹配，在 layer 层判断是否请求方法在 route 里有

methods 库地址：[https://www.npmjs.com/package/methods](https://www.npmjs.com/package/methods)

```js
[
  'acl',        'bind',        'checkout',
  'connect',    'copy',        'delete',
  'get',        'head',        'link',
  'lock',       'm-search',    'merge',
  'mkactivity', 'mkcalendar',  'mkcol',
  'move',       'notify',      'options',
  'patch',      'post',        'pri',
  'propfind',   'proppatch',   'purge',
  'put',        'rebind',      'report',
  'search',     'source',      'subscribe',
  'trace',      'unbind',      'unlink',
  'unlock',     'unsubscribe'
]
```

批量生成方法测试 demo 如下

```js
const express = require("./kaimo-express");
const app = express();

app.get("/", (req, res, next) => {
    res.end("get okk end");
});
app.post("/", (req, res, next) => {
    res.end("post okk end");
});

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
```

控制台执行下面命令：

```bash
curl -v -X POST http://localhost:3000/
```

layer 进行加速匹配 demo

```js
const express = require("./kaimo-express");
const app = express();

app.post("/", (req, res, next) => {
    res.end("post okk end");
});
app.put("/", (req, res, next) => {
    res.end("put okk end");
});
app.delete("/", (req, res, next) => {
    res.end("delete okk end");
});
app.options("/", (req, res, next) => {
    res.end("delete okk end");
});


app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
```

然后去访问：`http://localhost:3000/`
