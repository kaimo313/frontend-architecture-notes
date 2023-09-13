let Router = require("koa-router");
let ArticleController = require("../controller/articleController");
let article = new ArticleController();

const router = new Router({
    prefix: "/article" // 划分路由作用域
});

router.get("/add", article.add);
router.get("/remove", article.remove);

module.exports = router;
