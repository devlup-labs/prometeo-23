import { Link } from 'react-router-dom';

import './eventHome.css';

import eventPageImg from '../assets/homePage/eventHome.jpg';

export default function EventHome() {
    return (
        <div id="eventHome-container" 
            style={{backgroundImage: `url(${eventPageImg})`}}
        >
            <div id="eventHome">
                <div id="eventHome-left-section">
                    <div id="eventHome-left-section-top">
                        <div id="eventHome-title">EVENTS</div>
                        <div id="eventHome-description">
                            {/* lorem 100 */}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam auctor, nisl eget ultricies tincidunt, nunc
                            tortor lacinia nisl, nec ultricies nunc nisl nec
                            libero. Sed euismod, nisl nec tincidunt lacinia, nunc
                        </div>
                    </div>
                    <div id="eventHome-left-section-links">
                        <Link to="/events">
                            <button id="preregister-button" className="button-29">
                                View More
                            </button>
                        </Link>
                    </div>
                </div>
                <div id="eventHome-right-section">
                    {/* <div id="eventHome-image">
                        <img id="eventHome-image-img" src={eventPageImg} alt="image" />
                    </div> */}
                </div>
            </div>
        </div>
    );
}