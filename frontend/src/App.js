import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/navbar'
import HomePage from "./pages/homePage";
import Page_404 from "./pages/404";
import Speaker from "./pages/Speaker";
import Gallery from "./pages/Gallery";
import Sponsors from "./pages/Sponsors";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/speakers" element={<Speaker />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sponsors" element={<Sponsors />} />

          <Route path="/*" element={<Page_404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
