import { useState } from "react";
import { useEffect } from "react";
import loading1 from './assets/loading/big_bang.mp4';
import spinner from './assets/loading/loading2.gif';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  var count = 0;
  
  const handleLoading = () => {
    console.log("helo!");
    count++;
    if (count == 3) {
      setIsLoading(false);
    }
  }
  
  useEffect(
    () => {
      window.addEventListener("load",handleLoading);
      // const img1 = document.getElementById("img1");
      // const img2 = document.getElementById("img2");
      // img1.addEventListener("load", handleLoading);
      // img1.addEventListener("load", handleLoading);
      return () => window.removeEventListener("load",handleLoading);
    },[]
  )

  return (
    <div className="App">
      { 
        !isLoading ? 
        <div className="LoadingAnimation">
          <video id="my_video" autoPlay={true} muted>
            <source src={loading1} type="video/mp4" />
          </video>
          <img id="img1" src="https://i.imgur.com/EuNkAOE.jpeg" alt="loading" onLoad={handleLoading}/>
          <img id="img2" src="./assets/loading/hTyZfSb.jpeg" alt="loading" onLoad={handleLoading} />
          <img src="https://i.imgur.com/f3SNfZ1.jpeg" alt="loading" />
          <img src="https://i.imgur.com/EuNkAOE.jpeg" alt="loading" />
          <img src="https://i.imgur.com/lphLsss.jpeg" alt="loading" />
          <img src="https://i.imgur.com/NwpbHJb.jpeg" alt="loading" />
          <img src="https://i.imgur.com/7IlEwIl.jpeg" alt="loading" />
        </div> :
        <div className="spinner">
          <img src={spinner} alt="Loading..." />
        </div>
      }
    </div>
  );
}

export default App;
