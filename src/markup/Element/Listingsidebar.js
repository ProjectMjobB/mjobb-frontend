import React from 'react';
import { Link } from "react-scroll";


function Listingsidebar(){
	return(
		<div className="sticky-top bg-white">
			<div className="candidate-info onepage">
				<ul>
					<li>
						<Link activeClass="active" 
							className="scroll-bar nav-link" to="resume_headline_bx" smooth={true} offset={-70} duration={500}><span>Resume Headline</span> 
						</Link>
						
						</li>
					
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="it_skills_bx" smooth={true}  offset={-70} duration={500}><span>IT Skills</span> 
						</Link>
					</li>
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="projects_bx" smooth={true}  offset={-70} duration={500}><span>Projects</span> 
						</Link>
					</li>
												
				</ul>
			</div>
		</div>
	)
}
export default Listingsidebar;