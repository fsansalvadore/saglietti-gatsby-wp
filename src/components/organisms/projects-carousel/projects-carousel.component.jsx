import React from 'react';
import { Link } from 'gatsby'

import './projects-carousel.styles.scss'

const ProjectsCarousel = () => {
  return (
    <div className="projects-carousel">
      <div className="carousel-top">
        <div className="carousel-info">
          <div className="info-left">
            <p>1 — 10</p>
            <p>Branding  ·  Exhibitions  ·  Digital</p>
          </div>
          <div className="info-right">

          </div>
        </div>
      </div>
      <Link to="/contatti" className="carousel-bottom">
        <p>Project Name</p>
        <a href="/">Link</a>
      </Link>
    </div>
  )
}

export default ProjectsCarousel;