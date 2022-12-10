import { Link } from 'react-router-dom';

import './eventHome.css';

import eventPageImg from '../assets/backgrounds/roboguy.jpg';

import img1 from '../assets/events/Image1.jpg'
import img2 from '../assets/events/Image2.jpg'
import img3 from '../assets/events/Image3.jpg'

export default function EventHome() {
    return (
        <div id="eventHome-container">
            <img id="eventHome-image-img" src={eventPageImg} alt="bgImage" />
            <div id="eventHome">
                <div id="eventHome-left-section">
                </div>
                <div id="eventHome-right-section">
                    <div id="eventHome-title">EVENTS</div>
                    <div id="eventHome-eventCircles">
                        <div id="eventHome-eventCircle1">
                            <div className="eventHome-eventCircle-gradient"></div>
                            <img src={img1} alt="Technical Events" />
                        </div>
                        <div id="eventHome-eventCircle2">
                            <div className="eventHome-eventCircle-gradient"></div>
                            <img src={img2} alt="Informal Events" />
                        </div>
                        <div id="eventHome-eventCircle3">
                            <div className="eventHome-eventCircle-gradient"></div>
                            <img src={img3} alt="Talks" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}