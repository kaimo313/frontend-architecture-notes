const config = {
    // 配置端口号
    port: {
        option: "-p, --port <val>",
        description: "set your server port",
        usage: "kaimo-http-server --port 3000",
        default: 3000
    },
    // 配置目录
    directory: {
        option: "-d, --directory <val>",
        description: "set your start directory",
        usage: "kaimo-http-server --directory D:",
        default: process.cwd()
    },
    // 配置主机名
    host: {
        option: "-h, --host <val>",
        description: "set your hostname",
        usage: "kaimo-http-server --host 127.0.0.1",
        default: "localhost"
    }
};

module.exports = config;
