import React from "react";
import "./speaker.css";
import speakerDetails from "./speakerDetails";

function About(props) {
  return (
    <div className="blog-slider">
      <div className="blog-slider__wrp">
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img container">
            <img src={props.img} alt="" />
          </div>
          <div className="blog-slider__content">
            <div className="blog-slider__title">{props.name}</div>
            <span className="blog-slider__code">{props.designation}</span>
            <div className="projcard-bar"></div>
            <div className="blog-slider__text">{props.description} </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function createEntry(term) {
  return (
    <About
      key={term.id}
      img={term.imgURL}
      name={term.name}
      designation={term.designation}
      description={term.description}
    />
  );
}
function Speaker() {
  return (
    <div id="speakerPage">
      <h2 className="section-header">SPEAKERS</h2>
      <dl className="dictionary">{speakerDetails.map(createEntry)}</dl>
    </div>
  );
}
export default Speaker;
