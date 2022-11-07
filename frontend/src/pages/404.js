import { useEffect } from "react"

function Page_404() {
    useEffect(
        () => {
            const navBarEle = document.getElementById("navbar")
            navBarEle.style.opacity = 1;
        }
    )
    return (
        <div id="page_404">  
            <h1 style={{
                boxSizing: "border-box",
                padding: "10vh 0",
                color: "white",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0",
            }}>
                404
            </h1>
        </div>
    )
}

export default Page_404;