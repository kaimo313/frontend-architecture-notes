const express = require("./kaimo-express");
const app = express();

app.get(
    "/",
    (req, res, next) => {
        console.log(1);
        setTimeout(() => {
            next();
        }, 1000);
    },
    (req, res, next) => {
        console.log(11);
        next();
    },
    (req, res, next) => {
        console.log(111);
        next();
    }
);

app.get("/", (req, res, next) => {
    console.log(2);
    res.end("end");
});

app.listen(3000, () => {
    console.log(`server start 3000`);
    console.log(`在线访问地址：http://localhost:3000/`);
});
