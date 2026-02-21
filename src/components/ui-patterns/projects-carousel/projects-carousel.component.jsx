import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"
import ProjectsCarouselStyled from "./projects-carousel.styled"

const ProjectsCarousel = () => {
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
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 5000,
    cssEase: "linear",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    waitForAnimate: false,
    pauseOnHover: false,
    swipe: false,
    touchMove: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 0.5,
        },
      },
    ],
  }

  return (
    <ProjectsCarouselStyled>
      <div className="slider-container w-full h-full">
        <Slider {...settings}>
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
    <div className="relative h-full flex items-center justify-center object-contain">
      {project.featuredImage && (
        <img
          src={project.featuredImage?.node?.link}
          alt={project.title}
          className="h-full w-auto object-contain"
        />
      )}
    </div>
  )
}

export default ProjectsCarousel
