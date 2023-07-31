#! /usr/bin/env node

const program = require("commander");
const { version } = require("../package.json");
const config = require("./config.js");

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
console.log("parseObj---->", parseObj);

let keys = Object.keys(config);
console.log(keys);

// 最终用户拿到的数据
let resultConfig = {};
keys.forEach((key) => {
    console.log(parseObj[key]);
    resultConfig[key] = parseObj[key] || config[key].default;
});

console.log(resultConfig);
