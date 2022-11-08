import { useState, useEffect } from 'react';

import './homePage.css'

import PrometeoLogo from '../assets/homePage/logo.png'
import loading1 from '../assets/loading/big_bang.mp4';
import spinner from '../assets/loading/loading3.gif';

import solarSystem from "./solarsystem";

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    
    const handleLoading = () => {
        setIsLoading(false);
        document.body.style.backgroundColor = "#fff"
        // console.log("changed body colour");
    }
  
    const fadeScreenToHomePage = () => {
        const vid = document.getElementById("my_video");
        vid.remove();
        document.getElementById("LoadingAnimation").remove();
        
        document.body.style.background = "rgb(16,28,39)"
        document.body.style.background = "radial-gradient(circle, rgba(16,28,39,1) 10%, rgba(0,0,0,1) 90%)"
    
        const homePageEle = document.getElementById("homepage");
        homePageEle.style.opacity = 1;
        const navBarEle = document.getElementById("navbar")
        navBarEle.style.opacity = 1;
    
        solarSystem();
  
    }

    useEffect(  // when the component has rendered then add the event listener to it
      () => {
        // const navBarEle = document.getElementById("navbar")
        // navBarEle.style.opacity = 0;
        document.body.style.overflow = "hidden";

        const vid = document.getElementById("my_video");
        vid.addEventListener("canplay", handleLoading);
        vid.addEventListener("ended", fadeScreenToHomePage)
      },[]
    )
    return (
        <>            
            {
                isLoading && 
                (
                    <div className="spinner">
                        <img src={spinner} alt="Loading..." />
                    </div>
                )
            }
            <div id="LoadingAnimation">
                <video id="my_video" autoPlay={true} muted>
                    <source src={loading1} type="video/mp4" />
                </video>
            </div>
            <div id="homepage">
            </div>
        </>
    )
}