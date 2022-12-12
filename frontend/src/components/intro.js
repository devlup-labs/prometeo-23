import "./intro.css";
import logo_stone from "../assets/homePage/logo_stone.png";

export default function Introduction() {
    return (
        <div id="intro-container">
            <div id="intro">
                <div id="intro-title">ABOUT</div>
                <div id="intro-section-2">
                    <div id="intro-text">
                        Prometeo 2023 is the third edition of IIT Jodhpur's
                        National Technical + Entrepreneurial Festival. Prometeo
                        derives its name from the Greek word for forethinker,
                        and celebrates disruptive technologies through talks,
                        workshops, and competitions.
                    </div>
                    <div id="the-image">
                        <img id="the-image-img2" src={logo_stone} alt="image" />
                    </div>
                </div>
            </div>
        </div>
    );
}
