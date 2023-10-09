const Koa = require("koa");
const Router = require("@koa/router");
const bodyparser = require("koa-bodyparser");
const crypto = require("crypto");

const app = new Koa();
let router = new Router();
app.use(bodyparser());
app.use(router.routes());

let kaimoJwt = {
    toBase64Url(base64) {
        return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    },
    toBase64(content) {
        return Buffer.from(JSON.stringify(content)).toString("base64");
    },
    sign(content, secret) {
        return this.toBase64Url(crypto.createHmac("sha256", secret).update(content).digest("base64"));
    },
    encode(payload, secret) {
        console.log("进入 kaimo-jwt--encode--->", payload, secret);
        let header = this.toBase64Url(
            this.toBase64({
                typ: "JWT",
                alg: "HS256"
            })
        );
        let content = this.toBase64Url(this.toBase64(payload));
        let sign = this.sign([header, content].join("."), secret);
        return [header, content, sign].join(".");
    },
    base64urlUnescape(str) {
        str += new Array(5 - (str.length % 4)).join("=");
        return str.replace(/\-/g, "+").replace(/_/g, "/");
    },
    decode(token, secret) {
        console.log("进入 kaimo-jwt--decode--->", token, secret);
        let [header, content, sign] = token.split(".");
        console.log("header---->", header);
        console.log("content---->", content);
        console.log("sign---->", sign);
        let newSign = this.sign([header, content].join("."), secret);
        console.log("newSign---->", newSign);
        if (sign === newSign) {
            // 将 base64 转化成字符串
            return JSON.parse(Buffer.from(this.base64urlUnescape(content), "base64").toString());
        } else {
            throw new Error("token 被篡改");
        }
    }
};

router.post("/login", async (ctx, next) => {
    let { username, password } = ctx.request.body;
    if (username === "admin" && password === "123456") {
        let token = kaimoJwt.encode(username, "kaimo");
        ctx.body = {
            err: 0,
            username,
            token
        };
    }
});

router.get("/validate", async (ctx, next) => {
    let authorization = ctx.headers.authorization;
    try {
        let r = kaimoJwt.decode(authorization, "kaimo");
        ctx.body = {
            err: 0,
            username: r
        };
    } catch (error) {
        ctx.body = {
            err: 1,
            message: error
        };
    }
});

app.listen(3000);

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluIg.prJEZUHxS0PtLnjZ0RwhUyQ-4HkANXZVAlIHU3ZNh7k

console.log("Server running at http://127.0.0.1:3000/");
