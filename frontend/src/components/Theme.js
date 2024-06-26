import React from "react";
import { useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.css';
// 1) first install npm install bootstrap
// 2) Put any other imports below so that CSS from your components takes precedence over default styles.
import "./theme.css";
import FadeIn from "../components/fadein";

function Theme(props) {
    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
        // document.body.style.overflow = "auto";
    });

    useEffect(() => {
        // get current url
        const currentURL = window.location.href;
        // get the last part of the url
        const lastPart = currentURL.split("/").pop();
        // console.log("lastPart: ", lastPart)
        // if last part points to theme, scroll to theme
        if (lastPart === "#theme") {
          const themeEle = document.getElementById("theme");
          themeEle.scrollIntoView();
        }
      }, []);

    return (
        <FadeIn duration={500}>
            <div id="themePage" className="contentDiv">
                <div className="themeContent" id="theme">
                    <div className="themeHeader">THEME</div>
                    <div id="themeColumns">
                        <div className="themeColumn theme-video">
                            <div className="video-box d-flex justify-content-center">
                                <div className="theme-video-container">
                                    <iframe
                                        className="responsive-iframe"
                                        src="https://www.youtube.com/embed/GdNceDHonLU?rel=0"
                                        title="Prometeo '23 | IIT Jodhpur"
                                        frameBorder="0"
                                        allowFullScreen="allowfullscreen"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="themeColumn theme-desc">
                            <p align="justify">
                                {/* <b> Origin to Infinity </b>: */}
                                <br /> Technology has been the heart of the
                                development of the human race from the very
                                beginning and is speculated to be its heart till
                                infinity. The theme of Prometeo 2023,
                                <b> “Origin to Infinity” </b>is centered around
                                the same thought where we explore what
                                technology has been in the past, what it is now
                                and what it can be in the future. This year we
                                are going to explore the past and future of
                                technological and entrepreneurial developments
                                through a wide range of ideas developed and
                                presented during the course of Prometeo '23.
                                <br /> How did it all start? How did technology
                                and economics reach where it is today? What will
                                it look like in the future? Will we ever reach a
                                saturation point?
                                <br /> We, the team of Prometeo '23 invites you
                                all to join us and participate in Prometeo '23
                                and explore the answers to all these questions
                                through your participation, ideation and
                                dedication.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

export default Theme;
