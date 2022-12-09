import "./intro.css";
import comp from "../assets/homePage/caveman2.png";

export default function Introduction() {
    return (
        <div id="intro-container">
            <div id="intro">
                <div id="intro-section-1">
                    <div id="intro-title">Prometeo 2023</div>
                    <div id="intro-text">
                        Prometeo 2023 is the third edition of IIT Jodhpur's National
                        Technical + Entrepreneurial Festival. Prometeo derives its name
                        from the Greek word for forethinker, and celebrates disruptive
                        technologies through talks, workshops, and competitions.
                    </div>
                </div>
                <div id="intro-section-2">
                    <img id="the-image-img2" src={comp} alt="image" />
                </div>
            </div>
        </div>
    );
}
