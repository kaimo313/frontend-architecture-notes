## 前端的二进制

- 文件类型 Blob：二进制文件类型
- input 的 `type=file`：file 类型，继承于 Blob

## 前端实现下载功能

实现下载字符串到文件里，需要将字符串包装成二进制类型

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>前端实现下载功能</title>
    </head>
    <body>
        <script>
            let str = "<div><h1>凯小默的博客</h1><span>专注前端领域开发</span></div>";
            // 包装后的文件类型不能直接修改
            const blob = new Blob([str], {
                type: "text/html"
            });
            const a = document.createElement("a");
            a.setAttribute("download", "index.html");
            a.href = URL.createObjectURL(blob);
            a.click();
        </script>
    </body>
</html>
```

## 前端实现预览功能

读取二进制中的内容

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>前端实现预览功能</title>
    </head>
    <body>
        <input type="file" id="file" />
        <script>
            file.addEventListener("change", (e) => {
                console.log(e.target.files);
                // 二进制文件类型
                let file = e.target.files[0];

                // 方式一：同步读取
                let img = document.createElement("img");
                let url = URL.createObjectURL(file);
                img.src = url;
                document.body.appendChild(img);
                // 销毁使用
                // URL.revokeObjectURL(url);

                // 方式二：异步读取内容
                let fileReader = new FileReader();
                fileReader.onload = function () {
                    console.log(fileReader.result);
                    let img = document.createElement("img");
                    img.src = fileReader.result;
                    document.body.appendChild(img);
                };
                fileReader.readAsDataURL(file);
            });
        </script>
    </body>
</html>
```
