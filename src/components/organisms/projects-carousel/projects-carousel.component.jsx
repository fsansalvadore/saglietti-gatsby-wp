import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Slider from "react-slick"
import ProjectsCarouselStyled from "./projects-carousel.styled"

const ProjectsCarousel = () => {
  const data = useStaticQuery(graphql`
    query CarouselQuery {
      wordpress {
        projects(first: 25, where: { status: PUBLISH }) {
          nodes {
            id
            title
            date
            slug
            featuredImage {
              node {
                link
                sourceUrl
                imageFile {
                  childImageSharp {
                    fixed(width: 1500, quality: 90) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            }
            custom_post_type_Project {
              anno
              ambiti
              visitabile
            }
          }
        }
      }
    }
  `)

  const featuredProjects = data.wordpress.projects.nodes
    .filter(p => p.custom_post_type_Project.visitabile === true)
    .sort((a, b) =>
      a.date < b.date
        ? 1
        : a.date === b.date
          ? a.title > b.title
            ? 1
            : -1
          : -1,
    )
    .slice(0, 10)

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  }

  return (
    <ProjectsCarouselStyled className="projects-carousel">
      <div className="slider-container w-full h-full">
        <Slider {...settings}>
          {featuredProjects.map((project, i) => (
            <Slide key={project.id} project={project} />
          ))}
        </Slider>
      </div>
    </ProjectsCarouselStyled>
  )
}

const Slide = ({ project }) => {
  return (
    <div className="w-full h-full bg-black">
      <img
        src={project.featuredImage.node.link}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </div>
  )
}

export default ProjectsCarousel
