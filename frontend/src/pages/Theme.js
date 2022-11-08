import React from "react";
// import 'bootstrap/dist/css/bootstrap.css';
// 1) first install npm install bootstrap
// 2) Put any other imports below so that CSS from your components takes precedence over default styles.
import "./theme.css";

function Theme(){
    return (
      <div id="themePage" class="contentDiv">
        <div class="content">
          <div class="row mt-2">
            <div class="col-xl-6 mb-3">
              <div class="video-box d-flex justify-content-center">
                <div class="theme-video-container">
                  <iframe
                    class="responsive-iframe"
                    src="https://www.youtube.com/embed/8lOSuBvGfjo"
                  ></iframe>
                </div>
              </div>
            </div>
            <div class="col-xl-6 mb-3">
              <p>
                Each of us has a vision of what the future of technology holds.
                Each of us envisions a smart India which holds great potential
                in every field of development. The theme of Prometeo 2022 is
                designed on the same ideology of creating a New India by virtue
                of expanding the technical and economical orbit. There are vast
                horizons for us to touch still, and by the 3 <b>I</b>s: <b>I</b>
                nnovate-<b>I</b>mplement-<b>I</b>mprove, we will soon walk past
                those horizons! The heart of Prometeo this year is to develop
                and present ideas of what the technological and economical face
                of India would look like starting from the 2030s to the 2050s.
                Could India lead the world? Could India become a technological
                giant? Could India be the force behind the biggest global
                projects? All these questions have answers lying behind our
                participation, our ideas and our dedication. 
                <br />
                We invite you to put your best foot forward to present and
                experience the India of our vision with Prometeo'22!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Theme;