module.exports = {
    printWidth: 140, // 指定代码换行的字符长度，默认为 80，超过该长度会换行。
    singleQuote: false, // 使用单引号而不是双引号
    tabWidth: 4, // tabSize配置
    semi: true, // 句尾是否加;
    useTabs: false, // 是否利用tab替代空格
    ignorePath: ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    trailingComma: "none", // 是否使用尾逗号，有三个可选值"<none|es5|all>"
    arrowParens: "always", // 箭头函数参数永远加括号
    bracketSpacing: true, // 对象中的空格 默认true
    jsxBracketSameLine: false, // 标签属性较多时，标签箭头>另起一行
    vueIndentScriptAndStyle: false, // Vue文件脚本和样式标签缩进
    htmlWhitespaceSensitivity: "ignore" // html空白敏感度 strict ignore
};
