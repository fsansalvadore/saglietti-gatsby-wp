import React, { useEffect, useState, useRef } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import ProjectsCarouselStyled from "./projects-carousel.styled"
import ArrowRightCircle from "../../atoms/arrow-right-circle.component"
import ArrowLeftCircle from "../../atoms/arrow-left-circle.component"

import fallbackImg from "../../../images/fallback.png"

import { gsap } from "gsap"
import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { TweenMax, TweenLite, TimelineLite } from "gsap/all"

import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import CustomEase from "../../particles/vendor/gsap/CustomEase"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CSSRulePlugin, CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenMax, TweenLite, TimelineLite)
}

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

  let [count, setCount] = useState(0)
  const featuredProjects = data.wordpress.projects.nodes
    .filter(p => p.custom_post_type_Project.visitabile === true)
    .sort((a, b) =>
      a.date < b.date
        ? 1
        : a.date === b.date
        ? a.title > b.title
          ? 1
          : -1
        : -1
    )
    .slice(0, 10)
  const projLenght = featuredProjects.length
  const [currentProject, setCurrentProject] = useState(featuredProjects[0])
  const [outProject, setOutProject] = useState(null)
  const titleRef = useRef(null)
  const bg_prev = useRef(null)

  useEffect(() => {
    if (outProject) {
      bg_prev.current.style.backgroundImage = `url(${
        outProject.featuredImage
          ? outProject.featuredImage.node.link
          : fallbackImg
      })`
    }
    setCurrentProject(featuredProjects[count])
    if (typeof window !== `undefined`) {
      const titleTL = new TimelineLite()
      const titleTween = TweenMax.fromTo(
        titleRef.current,
        0.2,
        { y: 60 },
        { y: 0 }
      )
      const carouselImgTween = TweenMax.fromTo(
        ".carousel-img",
        0.5,
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, ease: "power3.out" },
        0
      )
      titleTL.add(titleTween).add(carouselImgTween)
    }
  }, [outProject, featuredProjects, count, setCurrentProject])

  const prevProject = e => {
    e.preventDefault()
    titleRef.current.style.transform = "translate3d(0, 30px, 0)"
    setTimeout(() => {
      setOutProject(featuredProjects[count])
      if (count === 0) {
        setCount(projLenght - 1)
      } else {
        setCount(count - 1)
      }
      bg_prev.current.style.backgroundImage = "none"
    }, 100)
  }

  const nextProject = e => {
    e.preventDefault()
    titleRef.current.style.transform = "translate3d(0, 30px, 0)"
    setTimeout(() => {
      setOutProject(featuredProjects[count])
      if (count === projLenght - 1) {
        setCount(0)
      } else {
        setCount(count + 1)
      }
    }, 100)
  }

  return (
    <ProjectsCarouselStyled className="projects-carousel">
      <div className="carousel-top" ref={bg_prev}>
        <div className="carousel-info">
          <div className="info-left">
            <p>
              {featuredProjects.indexOf(currentProject) + 1} — {projLenght}
            </p>
            <p className="proj_ambiti">
              {currentProject.custom_post_type_Project.ambiti &&
                currentProject.custom_post_type_Project.ambiti.map(ambito => (
                  <li
                    key={`${ambito}-${Math.floor(
                      Math.random() * (100 - 999) + 100
                    )}`}
                  >
                    {ambito}
                  </li>
                ))}
            </p>
          </div>
          <div className="info-right">
            <Link to="#" onClick={prevProject}>
              <ArrowLeftCircle light />
            </Link>
            <Link to="#" onClick={nextProject}>
              <ArrowRightCircle light />
            </Link>
          </div>
        </div>
        {currentProject.featuredImage ? (
          currentProject.featuredImage.node.imageFile &&
          !currentProject.featuredImage.node.sourceUrl.includes(".gif") ? (
            <BackgroundImage
              className="carousel-img"
              // style={{backgroundImage: `url(${currentProject.featuredImage.node.link})`}}
              fixed={
                currentProject.featuredImage.node.imageFile.childImageSharp
                  .fixed
              }
            />
          ) : (
            <div
              className="carousel-img"
              style={{
                backgroundImage: `url(${currentProject.featuredImage.node.link})`,
              }}
            />
          )
        ) : null}
      </div>
      <Link to={`/progetti/${currentProject.slug}`} className="carousel-bottom">
        <p>
          <span ref={titleRef}>{currentProject && currentProject.title}</span>
        </p>
        <ArrowRightCircle />
      </Link>
    </ProjectsCarouselStyled>
  )
}

export default ProjectsCarousel
