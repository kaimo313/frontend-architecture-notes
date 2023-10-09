## 什么是 jwt

JSON WEB TOKEN (jwt) 是目前最流行的跨域身份验证解决方案。

解决问题：session 不支持分布式框架，无法支持横向扩展，只能通过数据库来保存会话数据实现共享，如果持久层失效就会出现认证失败。

优点：服务器不保存任何会话数据，即服务器变为无状态，使其更容易扩展。

## jwt 组成

### Header 头部

header 典型的由两部分组成：token 的类型（“JWT”）和算法名称（比如：HMAC SHA256或者RSA等等）。

```js
{
    'typ': "JWT",
    'alg': "HS256"
}
```

将头部进行 base64 加密（该加密是可以对称解密的），得到 JWT 的第一部分

### Payload 负载、负荷

它包含声明（要求），声明是关于实体(通常是用户)和其他数据的声明。

声明有三种类型: registered（标准中注册的声明）, public（公共的声明）和 private（私有的声明）。

- `Registered claims`: 一组预定义的声明，它们不是强制的，但是推荐。
- `Public claims`: 可以随意定义。
- `Private claims`: 用于在同意使用它们的各方之间共享信息，并且不是注册的或公开的声明。

jwt 规定了 7 个官方字段（标准中注册的声明 (建议但不强制使用)）

```bash
iss (issuer) jwt 签发人
exp (expiration time) jwt 过期时间
sub (subject) 主题 / jwt 所面向的用户
aud (audience) 受众 / 接收 jwt 的一方
nbf (Not Before) jwt 生效时间
iat (Issued At) jwt 签发时间
jti (JWT ID) 编号 / jwt 唯一身份标识
```

例子：

```js
{
    "sub": '1234567890',
    "name": 'kaimo',
    "admin": true
}
```

对 payload 进行 Base64 编码就得到 JWT 的第二部分

### Signature

对前两个部分的签名，防止数据篡改。

需要编码过的 header、编码过的 payload 连接组成的字符串，然后通过 header 中指定的签名算法进行加盐 secret 组合加密，然后就构成了 jwt 的第三部分。

例子：

```js
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

## Base64URL 算法

Base64 有三个字符：`+`，`/`，`=`，在 URL 里面有特殊含义，所以要被替换掉：

- `=` 被省略
- `+` 替换成 `-`
- `/` 替换成 `_`

这个就是 Base64URL 算法。

## jwt-simple 的使用

实现个登录跟检测是否登录功能

```bash
npm i jwt-simple koa-bodyparser
```

这里使用简单点的 `jwt-simple`，强一点的可以使用 `jwtwebtoken`

访问:

```bash
curl -v -X POST --data "username=admin&password=123456" http://localhost:3000/login
```

## 实现自己的 jwt

这个 base64urlUnescape 方法反解 base64 的方法，可以参考 `jwt-simple` 里的实现，是规定的解法。
