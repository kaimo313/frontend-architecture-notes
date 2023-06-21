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

1. 先创建 bin 的配置
2. `#! /usr/bin/env node` 文件里添加这行放头部，标明以 node 的方式来执行
3. 放到 npm 全局中（方式一：全局安装，方式二：`npm link`）
