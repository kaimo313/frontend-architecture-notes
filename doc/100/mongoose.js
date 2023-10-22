const mongoose = require("mongoose");

// 1、连接 mongodb
let conn = mongoose.createConnection("mongodb://kaimo313:kaimo313@localhost:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
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
Student.create({
    username: "kaimo001",
    password: "kaimo001",
    test: "测试多余数据"
}).then((doc) => {
    console.log(doc);
});
