1、添加 .npmignore 文件，忽略不需要的文件

```bash
public
```

2、去官网[https://www.npmjs.com/](https://www.npmjs.com/)检查自己的包名是否被占用

3、切换到官方源，然后检查确认

```bash
nrm use npm
nrm ls
```

4、登录 npm 账号

```bash
npm login
```

5、发布

```bash
npm publish
```

6、查看发布情况

7、更新版本，我们添加一个 `README.md` 文件

```html
凯小默的学习笔记，这是一个实现类似 http-server 的库。
```

- 升级补丁版本号：`npm version patch`
- 升级小版本号：`npm version minor`
- 升级大版本号：`npm version major`

然后执行命令

```bash
npm version patch
npm publish
```

8、全局安装使用 `kaimo-http-server`

```bash
npm i -g kaimo-http-server
```

然后随便去一个文件夹下执行命令

```bash
kaimo-http-server
kaimo-http-server --version
kaimo-http-server --help
```
