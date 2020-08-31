import React, { useEffect, useState, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby'

import ProjectsCarouselStyled from './projects-carousel.styled'
import ArrowRightCircle from '../../atoms/arrow-right-circle.component';
import ArrowLeftCircle from '../../atoms/arrow-left-circle.component';

import { gsap } from "gsap";
import { TweenLite, TimelineLite } from "gsap/all";

import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import CustomEase from '../../particles/vendor/gsap/CustomEase'

if(typeof window !== `undefined`) {
  gsap.registerPlugin(CSSRulePlugin, CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}


const ProjectsCarousel = () => {
  const data = useStaticQuery(graphql`
    query CarouselQuery {
      wordpress {
        projects {
          nodes {
            id
            title
            date
            slug
            featuredImage {
              node {
                link
              }
            }
            custom_post_type_Project {
              ambiti
            }
          }
        }
      }
    }
  `)

  let [count, setCount] = useState(0);
  const projLenght = data.wordpress.projects.nodes.length;
  const [currentProject, setCurrentProject] = useState(data.wordpress.projects.nodes[0])
  const [outProject, setOutProject] = useState(null)
  const titleRef = useRef(null)
  const bg_prev = useRef(null)

  useEffect(() => {
    if(outProject) {
      bg_prev.current.style.backgroundImage = `url(${outProject.featuredImage.node.link})`;
    }
    setCurrentProject(data.wordpress.projects.nodes[count])
    if(typeof window !== `undefined`) {
      const titleTL = gsap.timeline();
      titleTL.fromTo(titleRef.current, 0.2, {y: 60}, {y: 0}).fromTo(".carousel-img", 1, {opacity: 0, scale: 1.2},{opacity: 1, scale: 1, ease: "power3.out"}, 0)
    }
  }, [outProject, data.wordpress.projects.nodes, count])
  
  const prevProject = (e) => {
    e.preventDefault();
    titleRef.current.style.transform = "translate3d(0, 30px, 0)"
    setTimeout(() => {
      setOutProject(data.wordpress.projects.nodes[count])
      if (count === 0) {
        setCount(projLenght - 1)
      } else {
        setCount(count - 1)
      }
      bg_prev.current.style.backgroundImage = "none";
    }, 200)
  }

  const nextProject = (e) => {
    e.preventDefault();
    titleRef.current.style.transform = "translate3d(0, 30px, 0)"
    setTimeout(() => {
      setOutProject(data.wordpress.projects.nodes[count])
      if (count === projLenght - 1) {
        setCount(0)
      } else {
        setCount(count + 1)
      }
    }, 200)
  }

  return (
    <ProjectsCarouselStyled className="projects-carousel">
      <div className="carousel-top" ref={bg_prev}>
        <div className="carousel-info">
          <div className="info-left" >
            <p>{data.wordpress.projects.nodes.indexOf(currentProject) + 1} — {projLenght}</p>
            <p>
              {currentProject.custom_post_type_Project.ambiti.map(ambito => (
                <li key={`${ambito}-${Math.floor(Math.random() * (100 - 999) + 100)}`}>{ambito}</li>
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
        <div className="carousel-img" style={{backgroundImage: `url(${currentProject.featuredImage.node.link})`}}></div>
      </div>
      <Link to={`/progetti/${currentProject.slug}`} className="carousel-bottom">
        <p><span ref={titleRef}>{currentProject && currentProject.title}</span></p>
        <ArrowRightCircle />
      </Link>
    </ProjectsCarouselStyled>
  )
}

export default ProjectsCarousel;