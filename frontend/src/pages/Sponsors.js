import React from "react";
// import sponsor_data from "../sponsors";
import sponsor_data from "./sponsor_info";
import './sponsor_style.css';


function logo(url){
   return(
    <img src={url} alt="sponsor_logo" />
   );
}

function createEntry(sponsorTerm) {
  return (
    <Entry
      key={sponsorTerm.id}
      emoji={sponsorTerm.emoji}
      name={sponsorTerm.name}
      description={sponsorTerm.meaning}
      img={sponsorTerm.image}
    />
  );
}

function Entry(props) {
  return (
    <div className="teamContainer" >
      <div className="section-header">
        <span>{props.name}</span>
      </div>

      <div className="team-card">
          {props.img.map(logo)};
      </div>  
    </div>
  );
}

function Sponsors() {
  return (
    <div id="sponsors_body">
      <h1 className="sponsor_h1">
        <span className="sponsor_h1_span">SPONSORS</span>
      </h1>
      <div>{sponsor_data.map(createEntry)}</div>
    </div>
  );
}

export default Sponsors;
