// 现在cmd里设置临时的环境变量，set kaimo=313，然后执行node env.js，输出是有313的值
// 然后你打开powershell执行 node env.js 是没有这个值输出
console.log(process.env.kaimo);
