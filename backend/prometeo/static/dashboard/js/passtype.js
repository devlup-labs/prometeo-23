function setPassType(email, passType) {
    let data = { email: email, passType: passType, csrfmiddlewaretoken: "csrf_token" };

    fetch("/setpasstype", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => {
            console.log("Request complete! response:", res);
        })
        .catch(err => {
            console.log("Request failed", err);
        });
}
