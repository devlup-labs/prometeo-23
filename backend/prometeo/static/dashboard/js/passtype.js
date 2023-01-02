// function setPassType(email, passType) {
//     let data = { email: email, passType: passType };

//     fetch("/dashboard/setpasstype/", {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     })
//     .then(res => {
//         console.log("Request complete! response:", res);
//         // window.location.reload();
//     }).then(data => {
//         // console.log("Request complete! data:", data);
//         window.location.href = "http://127.0.0.1:8000/dashboard/";
//     })
//     .catch(err => {
//         console.log("Request failed", err);
//     });
// }
