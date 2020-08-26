import React from 'react';
import { graphql, Link } from 'gatsby'

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

// export const query = graphql`
//   query CarouselQuery {
//     wordpress {
//       projects {
//         nodes {
//           id
//           title
//           date
//           slug
//         }
//       }
//     }
//   }
// `

export default ProjectsCarousel;