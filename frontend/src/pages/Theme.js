import React from "react";
import { useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.css';
// 1) first install npm install bootstrap
// 2) Put any other imports below so that CSS from your components takes precedence over default styles.
import "./theme.css";
import FadeIn from "../components/fadein";

function Theme() {
  useEffect(() => {
    const navBarEle = document.getElementById("navbar");
    navBarEle.style.opacity = 1;
    // document.body.style.overflow = "auto";
  });
  return (
    <FadeIn duration={500}>
      <div id="themePage" class="contentDiv">
        <h2>THEME</h2>
        <div class="themeContent">
          <div class="themeRow">
            <div class="themeColumn">
              <div class="video-box d-flex justify-content-center">
                <div class="theme-video-container">
                  <iframe
                    class="responsive-iframe"
                    src="https://www.youtube.com/embed/GdNceDHonLU?rel=0"
                    title="Prometeo'23 | IIT Jodhpur"
                    frameborder="0"
                    allowfullscreen="allowfullscreen"
                  ></iframe>
                </div>
              </div>
            </div>
            <div class="themeColumn">
              <p align="justify">
                {/* <b> Origin to Infinity </b>: */}
                <br /> Technology has been the heart of the development of the
                human race from the very beginning and is speculated to be its
                heart till infinity. The theme of Prometeo 2023,
                <b> “Origin to Infinity” </b>is centered around the same thought
                where we explore what technology has been in the past, what it
                is now and what it can be in the future. This year we are going
                to explore the past and future of technological and
                entrepreneurial developments through a wide range of ideas
                developed and presented during the course of Prometeo'23.
                <br /> How did it all start? How did technology and economics
                reach where it is today? What will it look like in the future?
                Will we ever reach a saturation point?
                <br /> We, the team of Prometeo'23 invites you all to join us
                and participate in Prometeo'23 and explore the answers to all
                these questions through your participation, ideation and
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
