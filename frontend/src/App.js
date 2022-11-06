import { useState } from "react";
import { useEffect } from "react";
import loading1 from './assets/loading/big_bang.mp4';
import spinner from './assets/loading/loading3.gif';
import './App.css';

import Navbar from './components/navbar'
import HomePage from "./pages/homePage";

import solarSystem from "./pages/solarsystem";


function App() {
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

    // document.body.style.opacity = "0";
    // document.body.style.transition = "opacity 2s ease";
    // document.body.style.background = "rgb(16,28,39)";
    // document.body.style.background = "radial-gradient(circle, rgba(16,28,39,1) 10%, rgba(0,0,0,1) 90%)";
    // document.body.style.opacity = "1";

    const homePageEle = document.getElementById("homepage");
    homePageEle.style.opacity = 1;
    const navBarEle = document.getElementById("navbar")
    navBarEle.style.opacity = 1;

    solarSystem();

  }
  
  useEffect(  // when the component has rendered then add the event listener to it
    () => {
      const vid = document.getElementById("my_video");
      vid.addEventListener("canplay", handleLoading);
      vid.addEventListener("ended", fadeScreenToHomePage)
    },[]
  )

  return (
    <div className="App">
      <div id="LoadingAnimation">
        <video id="my_video" autoPlay={true} muted>
          <source src={loading1} type="video/mp4" />
        </video>
      </div>
      {
        isLoading && 
        (
          <div className="spinner">
            <img src={spinner} alt="Loading..." />
          </div>
        )
      }
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
