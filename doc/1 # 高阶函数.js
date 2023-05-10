// 业务代码
function kaimo(...arg) {
    console.log("kaimo", ...arg);
}

// 给某个方法添加一个方法在它执行之前调用
Function.prototype.before = function (callback) {
    // 需要使用箭头函数（没有this；没有arguments）这里...是剩余运算符
    return (...arg) => {
        callback();
        // 这里...是展开运算符
        this(...arg);
    };
};

let newKaimo = kaimo.before(function () {
    console.log("newKaimo");
});

newKaimo("hello", "world");
