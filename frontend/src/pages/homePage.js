import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./homePage.css";

import PrometeoLogo from "../assets/homePage/logo.png";
import loading1 from "../assets/loading/big_bang.mp4";
import spinner from "../assets/loading/logo.gif";
import scrollGif from "../assets/homePage/scrolldown.gif";

import { loadTextures, createScene } from "./solarsystem";
import NewSolarSystem from "./newSolarSystem";
import FadeIn from "../components/fadein";

import LandingSection from "../components/landingSection";
import Introduction from "../components/intro";
import Theme from "../components/Theme";
import InitiativeHome from "../components/initiativeHome";
import EventHome from "../components/eventHome";
import StatsHome from "../components/statsHome";
import Infinity from "../components/infinity";
import Footer from "../components/footer";
import CA_Homepage from "../components/ca";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [hideGif, setHideGif] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  // write code to hide the scroll when footer is in view

  

  useEffect(() => {
    // console.log("isLoading: ", isLoading);
    // if (!isLoading) {
      const navBarEle = document.getElementById("navbar");
      navBarEle.style.opacity = 1;
      // const homePageEle = document.getElementById("homepage-solarSystem");
      // homePageEle.style.opacity = 1;
      
      // createScene();
      setShowContent(true);
    // }
  }, []);

  useEffect(() => {
    if (footerInView) {
      // console.log("footer in view");
      const scrollDownEle = document.getElementById("scroll-down");
      if (scrollDownEle) {
        // console.log("scroll down ele: ", scrollDownEle);
        scrollDownEle.style.opacity = 0;
      }
    }
    else {
      // console.log("footer not in view");
      const scrollDownEle = document.getElementById("scroll-down");
      if (scrollDownEle) {
        // console.log("scroll down ele: ", scrollDownEle);
        scrollDownEle.style.opacity = 1;
      }
    }
  }, [footerInView]);

  return (
    <div id="homepage">
      {/* <NewSolarSystem setIsLoading={setIsLoading} onLoad /> */}
      {
        !showContent ?
        // isLoading &&
        (
          <div className="spinner">
            <img src={spinner} id = "loader-gif" alt="Loading..." />
          </div>
        ) :
      //  }
      //  {
      //   showContent &&
        (
          <FadeIn duration={500}>
              <div id="scroll-down">
                <img src={scrollGif} alt="Scroll Down" id="scroll-down-gif" />
              </div>
              <div id="homepage-content">
                <LandingSection />
                <div id="filler-1"></div>
                <Introduction />
                <div id="filler-2"></div>
                <StatsHome />
                <CA_Homepage />
                <Theme />
                <EventHome />
                {/* <div id="filler-3"></div>
                <InitiativeHome /> */}
                <div id="filler-4"></div>
                <Infinity />
                {/* footer with props */}
                <Footer view={setFooterInView}/>
              </div>
          </FadeIn>
        )
      }
    </div>
  );


  // return isLoading ? 
  //     (
  //       <div className="spinner">
  //         <img src={spinner} id = "loader-gif" alt="Loading..." />
  //       </div>
  //     ) : (
  //       // <FadeIn duration={500}>
  //         <div>
  //           <div id="homepage">
  //             {/* <div id="scroll-down">
  //               <img src={scrollGif} alt="Scroll Down" id="scroll-down-gif" />
  //             </div> */}
  //             <div id="homepage-content">
  //               <LandingSection />
  //               {/* <Introduction />
  //               <Theme />
  //               <InitiativeHome />
  //               <div id="black-filler"></div>
  //               <EventHome />
  //               <div id="purple-filler"></div>
  //               <GalleryHome /> */}
  //             </div>
  //           </div>
  //         </div>
  //       // </FadeIn>  
  //     );
}