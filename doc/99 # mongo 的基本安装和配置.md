## 关系型数据库和非关系型数据库

- MySQL Oracle SqlServer 用一种关系模型来组织数据的数据库（查询方便，不方便拓展）
- nosql mongo redis memcached （不同于传统的关系数据库）

## mongo 特点

- 分布式：文档类型，值就是传统对象类型 `key=>value` BSON，储存复杂结构的数据
- 性能高：不需要通过 SQL 层来进行解析（分析的过程 操作的过程 浪费性能），数据之间没有耦合，可以方便拓展，不适合复杂查询

## mongo 的安装方式

[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

选择自己的版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/2f0afbd369c944f6818835917765c574.png)
我参考的是这篇文章安装的：[MongoDB下载安装教程](https://blog.csdn.net/qq_46112274/article/details/117420196)

## 启动 mongodb

手动启动：自己启动服务端，并且指向路径储存的路径，然后启动客户端，需配置环境变量

```bash
mongod --dbpath="D:\Program Files\MongoDB\Server\4.4\data"
mongo
```

或者启动 MongoDB，再双击 `mongo.exe`

![在这里插入图片描述](https://img-blog.csdnimg.cn/1341a840ef8549108215a1966fd41490.png)

可执行文件的路径

```bash
"D:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --config "D:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg" --service
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c559fe1048c3472a8e02325ef5784884.png)
cfg 配置文件 `D:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg` 如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/92159b6d4cdf4e7ba0fbc3301120dc3d.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/7dacfbd1990645af84aebd14528ce728.png)
在浏览器访问：`http://127.0.0.1:27017` 出现如下页面证明 mongoDb 启动成功。

![在这里插入图片描述](https://img-blog.csdnimg.cn/6328747e48434ae29f267ec327454091.png)

## mongo 的语句

显示所有的数据库（默认免密码）

```bash
show dbs
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/671dbd64e42440e6b712383ad9b4fc23.png)
如果数据库不存在，则创建数据库，否则切换到指定数据库。

```bash
use DATABASE_NAME
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/834afe896399461e94a741dbb51341e9.png)
如果要查看已有集合，可以使用下面两个命令：

```bash
show collections
show tables
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4b0397e3ceb54d9596ea99d11a7e7bd1.png)
我们创建数据库kaimo，往集合 kaimo 里插入两条数据

```bash
use kaimo
db.kaimo.insertOne({"name":"凯小默1"})
db.kaimo.insertOne({"name":"凯小默2"})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6772d9c1d5134644aea50f13213e2c73.png)
查询

```bash
db.kaimo.find({})
db.kaimo.find({"name": "凯小默1"})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5d40abe50bd4d6b9cff24c16f27a226.png)

删除

```bash
db.kaimo.deleteOne({"name": "凯小默2"})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/6dc3ec6a7f0640e9855e988d65a7fe79.png)

下面创建根用户，在创建一个数据库分配这个数据库的权限，默认可以在 admin 中创建根用户，创建其他数据库，在针对某个数据库中，创建用户，赋予当前权限，下次链接这个数据库时可以登录这个账号。

```bash
use admin
db.createUser({user: "root", pwd: "root", roles: ["root"]})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4aa7a9a6df1d4ebdacf60dd534422ed8.png)
创建一个 user 库，给集合 student 添加两条数据

```bash
use user
db.student.insert({name:"凯小默", age: 313})
db.student.insert({name:"凯小默2", age: 3})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/66f4fd436ff64ab5997eaec19603ec5c.png)
**ObjectId 的构成**

ObjectId 是一个 12 字节的 BSON 类型字符串，按照字节顺序，依次代表：

- 4 字节：UNIX 时间戳
- 3 字节：表示运行 MongoDB 的机器
- 2 字节：表示生成此 _id 的进程
- 3 字节：由一个随机数开始的计数器生成的值

```js
ObjectId("65279b292d3834025d88a1b9")
```

MongoDB 开启安全认证，首先使用配置文件，增加参数：

```bash
security:
  authorization: enabled
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/02e823c6cc514efe9f3cf71571b23f4c.png)
在重新启动，执行 `show dbs` 发现看不到数据库了

![在这里插入图片描述](https://img-blog.csdnimg.cn/c1619f2fc0d64dc1a5d98e352988bdc8.png)
以用户管理员身份进行连接和验证

```bash
use admin
db.auth("root", "root")
show dbs
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/c5dc4b9aea7a46fc82250cf46498d0a6.png)
再创建一个用户 kaimo313 去管理用户表，可读可写

```bash
use user
db.createUser({user: "kaimo313", pwd: "kaimo313", roles: [{role: "readWrite", db: "user"}]})
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/1e3932872e10451593abde0374bda876.png)
重启服务，访问 user 库里的所有集合，会提示：`Warning: unable to run listCollections, attempting to approximate collection names by parsing connectionStatus`

```bash
use user
show collections
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/306c957c31de4a3f8cfbbab6d198a267.png)

上面的原因是因为连着的 MongoDB 中的 user 数据库它是有用户名和密码的，在没有进行登录的情况下，想直接查看数据库集合名称时，遭到了拒绝，因此，首先要进行登录操作，获得查看 collections 的权限。

```bash
db.auth("kaimo313", "kaimo313")
show collections
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9e9e2f1d70a1412dbf378aba5cc222c7.png)
| mysql  | mongo |
| ------ | ----- |
| 库     | 库    |
| 表     | 集合  |
| 行和列 | BSON  |

## Robo 3T

[Robo 3T：MongoDB 可视化工具](https://robomongo.org/)

[Robo 3T v1.4.3下载地址](https://download.studio3t.com/robomongo/windows/robo3t-1.4.3-windows-x86_64-48f7dfd.exe)

我参考的是这篇：[【Robo 3T】MongoDB可视化工具-- Robo 3T使用教程](https://blog.csdn.net/zzddada/article/details/120872975)

点击【Create】，选择【Connection】输入需要连接的服务端【地址】和【端口】

![在这里插入图片描述](https://img-blog.csdnimg.cn/de44f986a194437b989f108cc25eaa7b.png)
配置权限
![在这里插入图片描述](https://img-blog.csdnimg.cn/2b14bdcf670b4e06bfcb52b800e1474a.png)
双击或者链接
![在这里插入图片描述](https://img-blog.csdnimg.cn/d7f72c20184249c09bf92f69a780cd03.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c31ff16d407c428aa89e329960b9cb44.png)
配置user表权限
![在这里插入图片描述](https://img-blog.csdnimg.cn/faf3f4ca799e4647bcc46a3f2c20c8fc.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/a3150685677b43b5af647cf250c7347d.png)
