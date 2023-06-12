// 模板引擎的实现原理：（with 语法 + 字符串拼接 + new Function 来实现）

// 实现自定义的模板引擎

const fs = require("fs");
const path = require("path");

// const kaimoRenderFile = (filePath, obj, cb) => {
//     fs.readFile(filePath, "utf-8", (err, html) => {
//         if (err) {
//             return cb(err, html);
//         }
//         // 正则匹配 `{{}}` 里面的任意字符不是大括号就行至少一个
//         // 分组是用圆括号“()”括起来的正则表达式，匹配出的内容就表示一个分组。
//         html = html.replace(/\{\{([^}]+)\}\}/g, function () {
//             // arguments[0]：就是匹配到的原字符串，arguments[1]：就是第一个园括号
//             let key = arguments[1].trim();
//             return obj[key];
//         });
//         cb(err, html);
//     });
// };

// kaimoRenderFile(
//     path.resolve(__dirname, "../file/kaimo-template.html"),
//     { name: "kaimo", age: "313", arr: [1, 2, 3] },
//     (err, data) => {
//         console.log(data);
//     }
// );

// 处理有循环遍历的模板

// 需要把字符串 {%%} 替换调，并且拼出一个结果的字符串，new Function 的方式变为函数，利用 with 解决作用域问题

// function anonymous(obj) {
//     let str = "";
//     with (obj) {
//         str += `<!DOCTYPE html>
//     <html lang="en">

//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//     </head>

//     <body>
//         ${name}
//         ${age}
//         `;
//         arr.forEach((item) => {
//             str += `

//         <li>${item}</li>
//         `;
//         });
//         str += `

//     </body>

//     </html>`;
//     }
//     return str;
// }

const kaimoRenderFile = (filePath, obj, cb) => {
    fs.readFile(filePath, "utf-8", (err, html) => {
        if (err) {
            return cb(err, html);
        }
        // 正则匹配 `{{}}` 里面的任意字符不是大括号就行至少一个
        // 分组是用圆括号“()”括起来的正则表达式，匹配出的内容就表示一个分组。
        html = html.replace(/\{\{([^}]+)\}\}/g, function () {
            // arguments[0]：就是匹配到的原字符串，arguments[1]：就是第一个园括号
            let key = arguments[1].trim();
            // 这里将 {{name}} 处理成 ${name}
            return "${" + key + "}";
        });
        // 正则匹配 `{{}}` 里面的任意字符不是百分号就行至少一个
        let head = `let str = '';\r\n with(obj){ \r\n`;
        head += "str+=`";
        html = html.replace(/\{\%([^%]+)\%\}/g, function () {
            return "`\r\n" + arguments[1] + "\r\n str+=` \r\n";
        });
        let tail = "`} \r\n return str;";
        console.log(head + html + tail);
        // 参数是obj，函数体是 head + html + tail
        let fn = new Function("obj", head + html + tail);
        console.log(fn.toString());
        cb(err, fn(obj));
    });
};

kaimoRenderFile(
    path.resolve(__dirname, "../file/kaimo-template2.html"),
    { name: "kaimo", age: "313", arr: [1, 2, 3] },
    (err, data) => {
        console.log(data);
    }
);
