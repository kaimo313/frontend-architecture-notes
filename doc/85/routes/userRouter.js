let Router = require("koa-router");
let UserController = require("../controller/userController");
let user = new UserController();

const router = new Router({
    prefix: "/user" // 划分路由作用域
});

router.get("/add", user.add);
router.get("/remove", user.remove);

module.exports = router;
