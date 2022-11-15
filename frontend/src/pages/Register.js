import { useEffect } from "react"
import "./Register.css";
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
            <div id="register">  
                <h1 id="register-text">
                    Registrations will be up soon!
                </h1>
            </div>
        </FadeIn>
    )
}

export default Page_404;