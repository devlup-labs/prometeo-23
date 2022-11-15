import { useEffect } from "react"
import "./Login.css";
import FadeIn from "../components/fadein";

function Page_404() {
    useEffect(
        () => {
            const navBarEle = document.getElementById("navbar")
            navBarEle.style.opacity = 1;
        }
    )
    return (
		<FadeIn duration={500}>
            <div id="login">  
                <h1 id="login-text">
                    Registrations will be up soon!
                </h1>
            </div>
        </FadeIn>
    )
}

export default Page_404;