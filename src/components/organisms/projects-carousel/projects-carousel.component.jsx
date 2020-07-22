import React from 'react';

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
      <div className="carousel-bottom">
        <p>Project Name</p>
        <a>Link</a>
      </div>
    </div>
  )
}

export default ProjectsCarousel;