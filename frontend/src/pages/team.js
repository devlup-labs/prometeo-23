import React from "react";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
// 1) first install npm install bootstrap
// 2) Put any other imports below so that CSS from your components takes precedence over default styles.
import "./team.css";
import FadeIn from "../components/fadein";
import team_data from "./team_info";


function createEntry(team) {
	return (
		<Entry id={team.id} 

    image={team.image}
    name={team.name}
    por={team.por}
    />
	);
}

function Entry(props) {
    
	
	return (
    
				<div className="col-sm-6 col-lg-4 col-xl-3">
        <div className="single-person">
          <div className="person-image">
            <img  className="card-image"src={props.image} alt="" />
            <span class="icon">
              <i class="fab fa-html5"></i>
            </span>
          </div>
          <div className="person-info">
            <h3 className="full-name">{props.name}</h3>
            <span className="speciality">{props.por}</span>
          </div>
        </div>
      </div>
	);
}




function Team() {
  useEffect(() => {
    const navBarEle = document.getElementById("navbar");
    navBarEle.style.opacity = 1;
    // document.body.style.overflow = "auto";
  });
  return (
    <FadeIn duration={500}>
     <section className="section-team">
		<div className="container">
			{/* <!-- Start Header Section --> */}
			<div className="row justify-content-center text-center">
				<div className="col-md-8 col-lg-6">
					<div className="header-section">
						<h2 className="small-title">Our Team </h2>
						<h2 className="title">Let's meet with our team members</h2>
            <br />
            


            
					</div>
				</div>
			</div>
    {/* End header */}



    <h2 className="team-title">Web Development</h2>
      <div className="row justify-content-center text-center">{team_data.map(createEntry)}
      </div>
      
		</div>
	</section>
  </FadeIn>
  );
}

export default Team;
