import "./poster.css";

import FadeIn from "../components/fadein";
import { useEffect, useState, useRef, useReducer } from "react";

function PosterPresentation() {
  useEffect(
    // when the component has rendered then add the event listener to it
    () => {
      const navBarEle = document.getElementById("navbar");
      navBarEle.style.opacity = 1;
    },
    []
  );
  return (
    <FadeIn duration={500}>
      <section class="dark">
        <div class="container">
          <div class="poster-title">
            <h2>Poster Presentations</h2>
          </div>
          <article class="postcard blue" data-aos="fade-up">
            <div class="postcard__text">
              <h1 class="postcard__title blue">Prize 80,000 INR</h1>
              {/* <div class="postcard__subtitle">
                <time>Prize 80,000 INR</time>
              </div> */}
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">
                Poster Presentation in itself is an art that communicates days
                of hard work into a very short span of 2 minutes and a visual
                poster. It is such a unique event in which the audience is
                enriched with the creativity and intellect of the research
                without much of a description. So gear up and participate in
                this pan India Poster Presentation competition and showcase your
                work as well as witness the work of budding researchers.
              </div>
              <h2>Themes</h2>
              <ul class="">
                <li>AI </li>
                <li>Quantum </li>
                <li>Computing </li>
                <li>IoT </li>
                <li>Robotics </li>
                <li>Advancements in Genetics</li>
                <li>Health Care Technologies </li>
                <li>Materials and Fuels of the future</li>
                <li>Technology to aid differently-abled people</li>
              </ul>
              <p>
                The scope of this event is not limited to the topics mentioned
                above and we dearly welcome submissions from other impactful
                topics as well.
              </p>
              <h2>Event Guidelines</h2>
              <p>
                Round 1: Submission of abstract at the time of registration at
                Unstop.
              </p>
              <p>
                Round 2: The participants shortlisted based on the abstracts
                will present their posters offline at IIT Jodhpur.
              </p>
            </div>
            <div className="contact_poster">
              <h5>For any queries, please contact</h5>
              <h5>Name: +91 123456789</h5>
              <h5>Name: +91 123456789</h5>
            </div>
          </article>
        </div>
      </section>
    </FadeIn>
  );
}

export default PosterPresentation;
