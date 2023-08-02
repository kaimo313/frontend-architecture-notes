## 准备工作

上一节实现了通过 commander 的配置获取到用户的参数，下面完成借用 promise 写成类的方法一节没有完成的任务，实现一个 `http-server`，[https://www.npmjs.com/package/http-server](https://www.npmjs.com/package/http-server)，`http-server` 是一个简单的零配置命令行静态 HTTP 服务器。

需要用到的核心模块

```js

```

需要用到的第三方模块

```js

```

## 安装依赖

```bash
npm install ejs@3.1.3 debug@4.1.1 mime@2.4.6 chalk@4.1.0
```

## 配置环境变量

```js
const debug = require("debug")("server");
// 根据环境变量来进行打印 process.env.EDBUG
debug("hello kaimo-http-server");
```

```bash
set DEBUG=server
kaimo-http-server
```