import "./moonshot.css";
import initiativePageImg from "../assets/homePage/newumang0.png";

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
      <section
        class="moonshot-dark"
        // style={{
        //   backgroundImage: `url(${initiativePageImg})`,
        //   backgroundRepeat: "no-repeat",
        //   // filter:"blur(2px)",
        // }}
      >
        <div class="container">
          <div class="moonshot-title">
            <h2>Moonshot</h2>
          </div>
          <article class="moonshot blue" data-aos="fade-up">
            <div class="moonshot__text">
              <h1 class="moonshot__title blue">
                It is one of the flagship event of Prometeo 23.
              </h1>
              <div class="moonshot__bar"></div>
              <div class="moonshot__preview-txt">
                At Prometeo 23, with the theme Origin to Infinity, we hope to
                lead viewers(?) down the rabbit hole to investigate the origins
                of technology and where it is heading, i.e. future possibilities
                Moonshots are a great way to see where we're going and what's
                possible; every major breakthrough is a moonshot! We aim to
                develop and nurture Moonshot culture through this event. <br />{" "}
                In this event participants will be given an opportunity to
                propose a solution to any intractable or recalcitrant problems
                which you have identified or even share a problem which hasn’t
                been noticed or considered.The top three ideas will be funded
                and supported in every manner by us in order to reduce the risk
                element that is typically connected with moonshot ideas.
                (support by providing them tech , connections with various
                companies that would help foster the idea).We ensure that the
                project (moonshot idea) will be kept under wraps so as to give
                you the freedom to experiment freely, iterate and to prevent the
                idea from being stolen.
              </div>
              <h2>
                We decide if a project is among the best based on four criteria:
              </h2>
              <ul class="moonshot__projectCriteria">
                <li>
                  It must be capable of solving a major problem or introducing
                  us to new technologies that will improve or ease our lives.
                </li>
                <li>
                  The proposed solution must be radically different.A generic
                  point of view is not useful in solving an intractable problem;
                  in fact, intractable problems can only be tackled by thinking
                  outside the box.
                </li>
                <li>
                  It's got to be doable(solvable). There must be some basis to
                  trust the notion, whether theoretical or scientific in nature.
                </li>
                <li>
                  It might potentially be something that functioned in another
                  domain but hasn’t been transplanted in this domain(the one you
                  choose).
                </li>
                <li>Robotics </li>
                <li>Advancements in Genetics</li>
                <li>Health Care Technologies </li>
                <li>Materials and Fuels of the future</li>
                <li>Technology to aid differently-abled people</li>
              </ul>
              <p>Other key points</p>
              <ul class="moonshot__projectKeyPoints">
                <li>Aim for 10x not 10%</li>
                <li>Fall in love with the problem.</li>
                <li>
                  Real world knowledge and experience is key to knowing the
                  problem which is the first step to solving it.
                </li>
                <li>
                  Take on the hardest problem first ( it is a vital mindset to
                  most moonshots).
                </li>
                <li>
                  Embrace failure : “ don’t be embarrassed by your failures
                  start again” here we provide you with the funds and other
                  forms of support to iterate.
                </li>
                <li>
                  Moonshots are not smooth sailing ships they are the ones which
                  have the most unpredictable or harsh conditions , embrace it
                  and be ready to face it.
                </li>
                <li>
                  Don’t just focus on the general perspective try thinking out
                  of the box , it is one major reason why intractable problems
                  are left as problems.
                </li>
                <li>
                  Don’t think in terms of years think in terms of decades and
                  centuries.
                </li>
              </ul>
            </div>
            {/* <div className="contact_poster">
              <h5>For any queries, please contact</h5>
              <h5>Name: +91 123456789</h5>
              <h5>Name: +91 123456789</h5>
            </div> */}
          </article>
        </div>
      </section>
    </FadeIn>
  );
}

export default PosterPresentation;
