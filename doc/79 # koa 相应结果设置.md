返回的类型可能是文件流，或者是对象的等方式，需要我们对 `body` 的类型进行判断在返回。

 判断是否是 string 或者 buffer 、流、对象

```js
if (typeof body === "string" || Buffer.isBuffer(body)) {
    res.end(body);
} else if (body instanceof Stream) {
    body.pipe(res);
} else if (typeof body === "object") {
    res.end(JSON.stringify(body));
}
```
