ctx 跟 proto 的关系

```js
ctx.__proto__.__proto__ = proto
```

[MDN：__defineGetter__](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__)

> 备注： 此特性已弃用，建议使用对象初始化语法或 `Object.defineProperty()` API 来定义 getter。该方法的行为只针对 Web 兼容性进行了规定，在任何平台上都不需要实现该方法。它可能无法在所有地方正常工作。

[MDN：__defineSetter__](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineSetter__)

> 备注： 此特性已弃用，建议使用对象初始化语法或 Object.defineProperty() API 来定义 setter。该方法的行为只针对 Web 兼容性进行了规定，在任何平台上都不需要实现该方法。它可能无法在所有地方正常工作。

- `__defineGetter__()` 方法将一个对象的属性绑定到一个函数上，当该属性被访问时，该函数将被调用。
- `__defineSetter__()` 方法将一个对象的属性绑定到一个函数上，当该属性被赋值时，该函数将被调用。

```js
__defineGetter__(prop, func)
__defineSetter__(prop, func)
```

以后使用 ctx 变量时，会很少使用原生的 req 和 res，一般使用的都是 request，reponse，或者直接使用的方式。
