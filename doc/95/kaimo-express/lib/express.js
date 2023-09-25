const Application = require("./application");

function createApplication() {
    // 通过类来实现分离操作
    return new Application();
}

// 提供一个 Router 类，这个类可以 new 也可以当做函数来执行
createApplication.Router = require("./router");

module.exports = createApplication;
