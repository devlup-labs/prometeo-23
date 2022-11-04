import { useState } from "react";
import { useEffect } from "react";
import loading1 from './assets/loading/big_bang.mp4';
import spinner from './assets/loading/loading3.gif';
import './App.css';

import HomePage from "./pages/homePage";

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
    const homePageEle = document.getElementById("homepage");
    homePageEle.style.opacity = 1;
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
      <div className="LoadingAnimation">
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
      <HomePage />
    </div>
  );
}

export default App;
