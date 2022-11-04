import { useState } from "react";
import { useEffect } from "react";
import loading1 from './assets/loading/big_bang.mp4';
import spinner from './assets/loading/loading2.gif';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLoading = () => {
    setIsLoading(false);
  }
  
  useEffect(
    () => {
      const vid = document.getElementById("my_video");
      vid.addEventListener("canplay", handleLoading);
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
    </div>
  );
}

export default App;
