// 中间层的方式

const http = require("http");

// http.get 默认发送 get 请求
// http.request 支持其他请求格式 post

let client = http.request(
    {
        path: "/login",
        hostname: "localhost",
        port: 3000,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    },
    (res) => {
        console.log("状态码", res.statusCode);
        console.log("请求头", res.headers);
        res.on("data", (chunk) => {
            console.log(chunk.toString());
        });
    }
);

client.end(`{"kaimo": "313"}`);
