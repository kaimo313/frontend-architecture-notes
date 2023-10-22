const mongoose = require("mongoose");

// 1、连接 mongodb
let conn = mongoose.createConnection("mongodb://kaimo313:kaimo313@localhost:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
conn.on("connected", () => {
    console.log("链接成功");
});

// 学生模型
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
        },
        hobby: [String]
    },
    {
        collection: "Student" // 设置固定的名字
    }
);

let Student = conn.model("Student", StudentSchema);

// 作业模型
let HomeWorkSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        student: {
            ref: "Student",
            type: mongoose.SchemaTypes.ObjectId // 用户id
        }
    },
    {
        collection: "Homework" // 设置固定的名字
    }
);
let HomeWork = conn.model("Homework", HomeWorkSchema);

(async () => {
    let user = await Student.create({ username: "kaimo666", password: "123456" });

    let home = await HomeWork.create({
        title: "第一篇作业",
        content: "第一篇作业的内容",
        student: user._id
    });
    console.log(home);
    // 连表查询
    let r = await HomeWork.findById("653538ed066785338ab72d81").populate("student", { username: 1 });
    console.log("连表查询--r-->", r);
    // 修改：通过模型来操作；通过文档自己操作自己
    r.title = "修改后的标题";
    await r.save();
})();
