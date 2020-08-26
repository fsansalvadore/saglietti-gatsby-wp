import React from 'react';
import { graphql, Link } from 'gatsby'

import './projects-carousel.styles.scss'
import ArrowRightCircle from '../../atoms/arrow-right-circle.component';

const ProjectsCarousel = ({data}) => {
  console.log(data)

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
        <ArrowRightCircle />
      </Link>
    </div>
  )
}

export const query = graphql`
  query CarouselQuery {
    wordpress {
      projects {
        nodes {
          id
          title
          date
          slug
        }
      }
    }
  }
`

export default ProjectsCarousel;