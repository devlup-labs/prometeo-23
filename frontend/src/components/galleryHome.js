import { Link } from 'react-router-dom';

import './galleryHome.css';

import galleryPageImg from '../assets/homePage/galleryHome.jpg';

export default function GalleryHome() {
    return (
        <div id="galleryHome-container" 
            style={{backgroundImage: `url(${galleryPageImg})`}}
        >
            <div id="galleryHome">
                <div id="galleryHome-left-section">
                    <div id="galleryHome-left-section-top">
                        <div id="galleryHome-title">GALLERY</div>
                        <div id="galleryHome-description">
                            {/* lorem 100 */}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam auctor, nisl eget ultricies tincidunt, nunc
                            tortor lacinia nisl, nec ultricies nunc nisl nec
                            libero. Sed euismod, nisl nec tincidunt lacinia, nunc
                        </div>
                    </div>
                    <div id="galleryHome-left-section-links">
                        <Link to="/gallery">
                            <button id="preregister-button" className="button-29">
                                View More
                            </button>
                        </Link>
                    </div>
                </div>
                <div id="galleryHome-right-section">
                    {/* <div id="galleryHome-image">
                        <img id="galleryHome-image-img" src={galleryPageImg} alt="image" />
                    </div> */}
                </div>
            </div>
        </div>
    );
}