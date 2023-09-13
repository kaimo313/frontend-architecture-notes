class userController {
    async add(ctx, next) {
        await ctx.render("index.html", {
            name: "kaimo",
            age: 313
        });
    }
    async remove(ctx, next) {
        ctx.body = "用户删除";
    }
}
module.exports = userController;
