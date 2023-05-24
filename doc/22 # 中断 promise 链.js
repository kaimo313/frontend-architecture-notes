// Promise.resolve("kaimo313")
//     .then()
//     .then()
//     .then(
//         (data) => {
//             console.log("data--3-->", data);
//         },
//         (err) => {
//             console.log("err---->", err);
//         }
//     );

Promise.resolve("kaimo313")
    .then()
    .then(() => {
        return new Promise((resolve, reject) => {});
    })
    .then(
        (data) => {
            console.log("data--3-->", data);
        },
        (err) => {
            console.log("err---->", err);
        }
    );
