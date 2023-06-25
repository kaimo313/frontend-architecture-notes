## npm

3n：

- nrm：node 中源管理工具
- nvm：node 中的版本管理工具
- npm：node 的包管理器，管理的都是 node 的模块

## 第三方模块

分两种：

- 全局模块：只能在命令行中使用，任何路径都可以
- 本地模块：开发或者上线使用的

## 包的初始化工作

```bash
npm init
npm init -y
```

## 全局模块的安装

```bash
npm install nrm -g --registry https://registry.npm.taobao.org
```

安装完会有一个指向

> `C:\Program Files\nodejs\nrm -> C:\Program Files\nodejs\node_modules\nrm\cli.js`

nrm 不在环境变量 path 里，还能直接使用的原理：

> 将当前安装的模块放到 npm 目录下（快捷键），当执行 nrm 命令时，会自动执行 `cli.js`

查看 npm 的所有配置信息

```bash
npm config list
```

nrm 使用可以查看我这篇：[使用 nrm 镜像管理工具进行 npm 源管理](https://blog.csdn.net/kaimo313/article/details/130591323)

## 自己编写一个全局模块

实现下面命令在控制台执行

> kaimo 1 2 3 4 5 6

1. 先初始化包，新建 `my-kaimo-pack` 包，下面初始化项目

```bash
npm init -y
```

2. 然后创建 bin 的配置，新建 bin 文件夹，里面添加 `kaimo.js`，在 `package.json` 里配置 bin 的配置

```json
"bin": {
    "kaimo": "./bin/kaimo.js"
},
```

3. 在 `kaimo.js` 文件里添加 `#! /usr/bin/env node` 这行放到头部（就是我们前面分析 require 源码里提到的 Shebang），标明以 node 的方式来执行

```js
#! /usr/bin/env node

console.log("进入 bin 下的 kaimo.js 文件");

process.argv.slice(2).reduce((x, y) => Number(x) + Number(y));
```

4. 把包放到 npm 全局中（方式一：全局安装，方式二：`npm link`）

这里使用 `npm link`，它能够避免重复且繁琐的打包发布操作，给开发调试带来便捷，而且使用方法简单。使用 `npm link` 将 `kaimo.js` 模块创建成本地依赖包。

5. 执行 `kaimo 1 2 3 4 5`，可以看到就能执行成功了

6. 解除 link

```bash
npm unlink
```

## 安装项目包（开发/生产）

可以使用 `npm info xxx` 查看包信息

```bash
npm i webpack --save-dev
npm i vue
npm i jquery@3.0.0
```

- dependencies：项目依赖（--save）
- devDependencies：开发依赖（--save-dev）
- peerDependencies：同版本依赖（vue vue-template-compiler）


如果我们没有安装 jquery，又配置了下面的依赖，就会提示

```bash
"peerDependencies": {
    "jquery": "^3.0.0"
}
```

- bundleDependencies：打包依赖

使用 `npm pack` 打包时会打进去

```bash
"bundleDependencies": [
    "jquery"
]
```

- optionalDependencies：可选依赖（可装可不装）

## 版本问题

- `major.minor.patch`：表示破坏性更新.增加功能/修订大版本中的功能.小的bug
- `^2.0.0`：限制大版本
- `~2.3.0`：限制中版本
- `>=`
- `<=`
- `1.0.0-2.0.0`
- `alpha`：内测版本 `beta`：公测版本 `rc`：最终测试版 (`2.1.0-beta.1`)

## 运行脚本问题

添加脚本

```bash
"scripts": {
    "kaimo": "node ./bin/kaimo.js"
},
```

传参加 `--`

```bash
npm run kaimo -- 1 2 3 4 5
```

在看个例子：先安装 `mime`

```bash
npm i mime
```

添加脚本：

```bash
"scripts": {
    "kaimo": "node ./bin/kaimo.js",
    "mime": "mime"
},
```

这里为什么 `npm run mime -- a.js` 可以，`mime a.js` 不行？

执行 `npm run env`，可以看到 `Path` 变量里添加了 `.bin`

因为默认运行 `npm run` 时会将 `node_modules` 下的 `.bin` 目录放到全局下，所有可以使用当前文件下的命令

另外一种方案就是使用 npx 命令：npm 5.2 之后提供的（这个命令没有 npm run 好管理），npx 可以去下载包，下载完毕后执行，执行后会删除包，所以每次都是拿的最新包去执行

```bash
npm uninstall mime
npx mime a.js
```