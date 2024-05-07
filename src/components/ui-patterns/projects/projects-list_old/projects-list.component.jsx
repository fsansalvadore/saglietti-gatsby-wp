import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import projectHover from "../../../common/hooks/projectHover"
import fallbackImg from "../../../../images/fallback.png"

import { gsap } from "gsap"
import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { TweenLite, TimelineLite } from "gsap/all"
import CustomEase from "../../../common/vendor/gsap/CustomEase"

import "./projects-list.styles.scss"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const ProjectsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 150px auto 0 auto;
  padding: 0 2rem 80px 2rem;
  text-align: right;

  h1,
  h2 {
    font-family: "Inter";
    font-weight: 200;
    font-size: 1rem;
    letter-spacing: 0;
    margin-bottom: 2rem;
  }
  ul,
  li {
    position: relative;
    list-style-type: none;
    margin: 0;
    overflow: hidden;

    a {
      display: inline-block;
      text-decoration: none;
      font-size: 1.2rem;
      opacity: 0;
      letter-spacing: 0;
      margin: 0;
      line-height: 1.2rem;
      padding: 12px 0 14px 0;
    }
  }

  .proj_content {
    li {
      position: relative;

      a {
        width: 100%;
        will-change: transform;
        transition: opacity 0.2s ease;
      }

      .divider {
        position: absolute;
        width: 0;
        height: 1px;
        background-color: #000;
        top: 0;
        right: 0;
        transition: opacity 0.2s ease;
      }
    }
  }

  .last_divider {
    position: absolute;
    width: 0;
    height: 1px;
    background-color: #000;
    bottom: 0;
    right: 0;
  }

  h2 {
    font-weight: 200;
    margin-top: 60px;
  }

  .extra_proj-container {
    li {
      font-size: 0.8rem;
      font-weight: 400;
      padding: 10px 0;
    }
  }

  @media only screen and (min-width: 768px) {
    margin: 200px auto 0 auto;
    padding: 0 25% 200px 8.3%;

    .proj_content li a {
      font-size: 1.5rem;
      padding: 17px 0 19px 0;
    }
  }
`

const ProjectsList = ({ data }) => {
  useEffect(() => {
    if (typeof window !== `undefined`) {
      const menuTL = new TimelineLite()
      menuTL
        .fromTo(
          "h1",
          0.7,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, ease: "power4.out" },
        )
        .fromTo(
          ".prog_list-item a",
          1,
          { translateY: 100, opacity: 0 },
          {
            translateY: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.3,
        )
        .fromTo(
          ".divider",
          0.6,
          { width: "0%" },
          {
            width: "100%",
            ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 "),
            stagger: 0.1,
          },
          0,
        )
        .fromTo(
          ".last_divider",
          0.6,
          { width: "0%" },
          {
            width: "100%",
            ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 "),
          },
          "-=0.9",
        )

      const fadeInController = new ScrollMagic.Controller()

      if (document.querySelectorAll(".fade-in").length !== 0) {
        document.querySelectorAll(".fade-in").forEach(fadeInItem => {
          let TextRevealTL = new TimelineLite()
          TextRevealTL.fromTo(
            fadeInItem,
            {
              opacity: 0,
              y: 50,
            },
            {
              duration: 1.5,
              opacity: 1,
              y: 0,
              ease: CustomEase.create(
                "custom",
                "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1",
              ),
            },
          )

          new ScrollMagic.Scene({
            triggerElement: fadeInItem,
            triggerHook: 0,
            offset: -600,
            reverse: false,
          })
            .setTween(TextRevealTL)
            .addTo(fadeInController)
        })
      }
    }
  })

  const projectsRef = useRef(null)

  useEffect(() => {
    const projects = projectsRef.current.querySelectorAll("li")

    projects.forEach(proj_li => {
      proj_li.addEventListener("mouseover", () => {
        projectsRef.current.querySelectorAll("li").forEach(li => {
          li.querySelector("a").style.opacity = "0.25"
          li.querySelector("span").style.opacity = "0.25"
          projectsRef.current.querySelector(".last_divider").style.opacity =
            "0.25"
        })
        proj_li.querySelector("a").style.opacity = "1"
      })
      proj_li.addEventListener("mouseout", () => {
        projectsRef.current.querySelectorAll("li").forEach(li => {
          li.querySelector("a").style.opacity = "1"
          li.querySelector("span").style.opacity = "1"
          projectsRef.current.querySelector(".last_divider").style.opacity = "1"
        })
      })
    })
  })

  useEffect(() => {
    projectHover()
  })

  return (
    <>
      <ProjectsContainer>
        <h1>Progetti</h1>
        <ul className="proj_content" ref={projectsRef}>
          {data.wordpress.projects &&
            data.wordpress.projects.nodes.map(proj => (
              <li
                key={`${proj.id}-${proj.slug}-${Math.floor(
                  Math.random() * (100 - 999) + 100,
                )}`}
                className="pseudo content"
                data-fx="1"
                data-img={
                  proj.featuredImage
                    ? proj.featuredImage.node.link
                    : fallbackImg
                }
              >
                <span className="divider"></span>
                <div className="prog_list-item">
                  <Link to={`/progetti/${proj.slug}`} className="block__link">
                    {proj.title}
                  </Link>
                </div>
              </li>
            ))}
          <span className="last_divider"></span>
        </ul>
      </ProjectsContainer>
    </>
  )
}

export default ProjectsList
