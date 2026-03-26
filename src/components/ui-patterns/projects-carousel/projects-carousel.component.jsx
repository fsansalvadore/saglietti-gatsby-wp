import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// biome-ignore lint/correctness/noUnusedImports: React in scope for ESLint react/react-in-jsx-scope
import React, { useRef, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"

const ProjectsCarousel = () => {
  const sliderRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const data = useStaticQuery(graphql`
    query CarouselQuery {
      wordpress {
        projects(first: 100, where: { status: PUBLISH }) {
          nodes {
            id
            title
            slug
            language {
              slug
            }
            featuredImage {
              node {
                link
                sourceUrl
              }
            }
            custom_post_type_Project {
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
        (p.language?.slug || "it") === "it" &&
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
    autoplaySpeed: 2000,
    fade: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    pauseOnHover: false,
    arrows: false,
  }

  return (
    <div className="w-full flex-1 min-h-0 overflow-hidden relative border-b [&_.slick-slider]:h-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full [&_.slick-slide>div]:h-full">
      <button
        type="button"
        aria-label="arrow left"
        className="hidden md:block absolute z-10 inset-0 right-auto w-1/2 h-full"
        onClick={() => sliderRef?.current?.slickGoTo(activeSlide - 1)}
      />
      <button
        type="button"
        aria-label="arrow right"
        className="hidden md:block absolute z-10 inset-0 left-auto w-1/2 h-full"
        onClick={() => sliderRef?.current?.slickGoTo(activeSlide + 1)}
      />
      <Slider
        ref={sliderRef}
        afterChange={newIndex => setActiveSlide(newIndex)}
        className="h-full"
        {...settings}
      >
        {featuredProjects?.map(project => (
          <div
            key={project.id}
            className="h-full w-full flex items-center justify-center"
          >
            {project.featuredImage?.node?.sourceUrl && (
              <img
                src={project.featuredImage.node.sourceUrl}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </Slider>
      <div className="absolute !text-white left-4 bottom-4 md:left-8 md:bottom-8 text-2xl z-20">
        {activeSlide + 1} — {featuredProjects?.length || 0}
      </div>
    </div>
  )
}

export default ProjectsCarousel
