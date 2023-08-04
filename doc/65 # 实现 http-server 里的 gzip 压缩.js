// 服务端优化都是：压缩 + 缓存

// 前端可以通过 webpack 插件进行压缩
// gzip 根据替换来实现的，重复率越高，压缩后的结果越小

const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

// 方式一：读取文件压缩，如果文件大的话都读取到内存中，耗内存
// zlib.gzip(fs.readFileSync(path.resolve(__dirname, "./65/1.txt")), (err, data) => {
//     fs.writeFileSync(path.resolve(__dirname, "./65/2.txt.gz"), data);
// });

// 方式二：用转化流（可读可写）的方式，服务端的文件  => 压缩 => 客户端
fs.createReadStream(path.resolve(__dirname, "./65/1.txt"))
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(path.resolve(__dirname, "./65/2.txt.gz")));

// 根据请求头 header `[accept-encoding]` 里是否包含 gzip 来判断浏览器是否支持 gzip 压缩
