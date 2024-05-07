import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"
import ProjectsCarouselStyled from "./projects-carousel.styled"

const ProjectsCarousel = () => {
  let sliderRef = useRef(null)

  const play = () => {
    sliderRef.slickPlay()
  }

  useEffect(() => {
    sliderRef?.current && play()
  }, [sliderRef])

  const data = useStaticQuery(graphql`
    query CarouselQuery {
      wordpress {
        projects(first: 100, where: { status: PUBLISH }) {
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
              posizioneCarosello
            }
          }
        }
      }
    }
  `)

  const featuredProjects = data.wordpress.projects.nodes
    .filter(
      p =>
        !!p.custom_post_type_Project.posizioneCarosello &&
        p.custom_post_type_Project.posizioneCarosello !== 0,
    )
    ?.sort((a, b) =>
      a.custom_post_type_Project.posizioneCarosello <
      b.custom_post_type_Project.posizioneCarosello
        ? 1
        : a.custom_post_type_Project.posizioneCarosello ===
            b.custom_post_type_Project.posizioneCarosello
          ? a.title > b.title
            ? 1
            : -1
          : -1,
    )

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 1500,
    fade: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    pauseOnHover: false,
  }

  return (
    <ProjectsCarouselStyled>
      <div className="slider-container w-full h-full">
        <Slider ref={slider => (sliderRef = slider)} {...settings}>
          {featuredProjects?.map((project, i) => (
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
      {project.featuredImage && (
        <img
          src={project.featuredImage?.node?.link}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}
    </div>
  )
}

export default ProjectsCarousel
