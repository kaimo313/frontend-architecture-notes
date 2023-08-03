#! /usr/bin/env node

const program = require("commander");
const { version } = require("../package.json");
const config = require("./config.js");
const Server = require("../src/server.js");

program.name("kaimo-http-server");
program.usage("[args]");
program.version(version);

Object.values(config).forEach((val) => {
    if (val.option) {
        program.option(val.option, val.description);
    }
});

program.on("--help", () => {
    console.log("\r\nExamples:");
    Object.values(config).forEach((val) => {
        if (val.usage) {
            console.log("  " + val.usage);
        }
    });
});

// 解析用户的参数
let parseObj = program.parse(process.argv);

let keys = Object.keys(config);

// 最终用户拿到的数据
let resultConfig = {};
keys.forEach((key) => {
    resultConfig[key] = parseObj[key] || config[key].default;
});

// 将拿到的配置数据开启一个 server
console.log("resultConfig---->", resultConfig);
let server = new Server(resultConfig);
server.start();
