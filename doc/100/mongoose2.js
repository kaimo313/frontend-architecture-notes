const mongoose = require("mongoose");

// 1、连接 mongodb
let conn = mongoose.createConnection("mongodb://kaimo313:kaimo313@localhost:27017/user", {});
conn.on("connected", () => {
    console.log("链接成功");
});

// 2、Schema 骨架，根据这个骨架来创建内容，用来规范文档的
let StudentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: String,
        age: Number,
        birthday: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "Student" // 设置固定的名字
    }
);

// 3、通过骨架来创建模型 -> 集合 db.student.insert()
let Student = conn.model("Student", StudentSchema);

// 4、模型可以操作数据
(async () => {
    // 1) 批量插入:
    let arr = [];
    for (let i = 0; i < 4; i++) {
        arr.push({
            username: "kaimo" + i,
            password: "kaimo" + i,
            age: i
        });
    }
    let r1 = await Student.create(arr);
    console.log("批量插入----->", r1);

    // 2) 查询操作：findOne 是查询一个；find 是查询一组，查询的结果只采用某个几个字段
    // _id 比较特殊需要单独控制，username: 1, password: 1 表示显示该字段
    let r2 = await Student.findOne({ username: "kaimo1" }, { username: 1, password: 1 });
    // await Student.findById("652e81753e38c888970b3846");
    console.log("查询操作----->", r2);

    // 3) 修改操作 (查询条件，修改成的结果)
    // 修改所有年龄大于2的，年龄都加10
    // where 基本不用，性能差 （{$where: "age>2"}）
    // 操作符：lt: 小于 gt：大于 lte：小于等于 lgt：大于等于 inc：递增
    let r3 = await Student.updateOne({ age: { $gt: 2 } }, { $inc: { age: 10 } });
    console.log("修改操作----->", r3);
})();
