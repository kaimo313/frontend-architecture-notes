const Application = require("./application");

function createApplication() {
    // 通过类来实现分离操作
    return new Application();
}

module.exports = createApplication;
