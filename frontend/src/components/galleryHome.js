import { Link } from "react-router-dom";

import bgImage2 from "../assets/backgrounds/exploration.png";

import "./galleryHome.css";

export default function GalleryHome() {
    return (
        <div id="galleryHome-container">
            <img id="galleryHome-image-img" src={bgImage2} alt="bgImage" />
            <div id="galleryHome">
                <div id="galleryHome-top">
                    <div id="galleryHome-title">GALLERY</div>
                    <div id="galleryHome-description">
                        {/* lorem 100 */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam auctor, nisl eget ultricies tincidunt, nunc
                        tortor lacinia nisl, nec ultricies nunc nisl nec libero.
                        Sed euismod, nisl nec tincidunt lacinia, nunc
                    </div>
                </div>
                <div id="galleryHome-links">
                    <Link to="/gallery">
                        <button id="preregister-button" className="button-29">
                            View More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
