const fs = require("fs");
const path = require("path");

function copy(source, target, callback) {
    const SIZE = 3;
    const buffer = Buffer.alloc(SIZE);
    let readOffset = 0;
    let writeOffset = 0;
    // rfd 这个是文件描述符，是一个数字，是 Linux 规定的，windows 是从 3 开始
    fs.open(source, "r", (err, rfd) => {
        if (err) return callback(err);
        // wfd 是写文件的描述符
        fs.open(target, "w", (err, wfd) => {
            if (err) return callback(err);
            // 异步迭代需要 next，写完之后继续执行相同的逻辑
            const next = () => {
                // bytesRead 读取到的个数
                fs.read(rfd, buffer, 0, SIZE, readOffset, (err, bytesRead) => {
                    if (err) return callback(err);
                    // 更改读取偏移量
                    readOffset += bytesRead;
                    // 读取到几个就往文件中添加几个
                    fs.write(
                        wfd,
                        buffer,
                        0,
                        bytesRead,
                        writeOffset,
                        (err, written) => {
                            if (err) return callback(err);
                            // 更改写入偏移量
                            writeOffset += written;
                            // 判断是否需要继续下一步读取
                            if (bytesRead == SIZE) {
                                next();
                            } else {
                                // 完成后的操作
                                fs.close(rfd);
                                fs.close(wfd);
                                callback();
                            }
                        }
                    );
                });
            };
            next();
        });
    });
}

// 不会淹没系统的可用内存，合理读写（边读边写的方式）
copy(
    path.resolve(__dirname, "./45/name.txt"),
    path.resolve(__dirname, "./45/copy.txt"),
    (err) => {
        if (err) throw err;
        console.log("拷贝成功");
    }
);
