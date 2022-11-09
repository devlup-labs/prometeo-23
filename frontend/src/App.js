import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import './App.css';

import Navbar from './components/navbar'
import HomePage from "./pages/homePage";
import Page_404 from "./pages/404";
import Speaker from "./pages/Speaker";
import Gallery from "./pages/Gallery";
import Theme from "./pages/Theme";
import Sponsors from "./pages/Sponsors";
import Events from "./pages/Event.js";


function App() {

  const [bigBang, setBigBang] = useState(true);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage bb={bigBang} bbFunc={setBigBang}/>} />
          
          <Route path="/speakers" element={<Speaker />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/events" element={<Events />} />
          <Route path="/theme" element={<Theme />} />

          <Route path="/*" element={<Page_404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
