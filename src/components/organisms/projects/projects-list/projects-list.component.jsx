import React, {useEffect, useRef} from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import VerticalLine from '../../../atoms/vertical-line.component'
import projectHover from '../../../particles/hooks/projectHover'
import fallbackImg from '../../../../images/fallback.png'
import ArrowTopRight from '../../../../images/icons/arrow-top-right.svg'
import { gsap } from "gsap";
import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { TweenLite, TimelineLite } from "gsap/all";
import CustomEase from '../../../particles/vendor/gsap/CustomEase'

import './projects-list.styles.scss'

if(typeof window !== `undefined`) {
  gsap.registerPlugin( CustomEase )
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const ProjectsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 150px 0 0 0 ;
  text-align: left;
  position: relative;

  h1, h2 {
    font-family: 'FFMarkWebProLight';
    font-weight: 200;
    font-size: 1rem;
    letter-spacing: -0.03rem;
    margin: 0 20% 1rem 0;
    padding-left: 1rem;
    transform: tralsate3d(-60, 0, 0);
  }

  li.pseudo.content {
    overflow: hidden;
  }

  ul, li {
    position: relative;
    list-style-type: none;
    margin: 0;

    a {
      display: inline-block;
      text-decoration: none;
      font-size: 1rem;
      opacity: 1;
      letter-spacing: -0.05rem;
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
        cursor: pointer !important;
        
        * {
          cursor: pointer !important;
        }
      }

      .divider {
        position: absolute;
        width: 100%;
        height: 1px;
        opacity: 0;
        background-color: #000;
        top: 0;
        right: 0;
        transition: opacity 0.2s ease;
      }
    }

    .block__link {
      display: flex;
      align-items: center;

      &.no_link {
        cursor: not-allowed;
        pointer-events: none;
      }

      .proj_item-left {
        width: 80%;
        opacity: 0;
        text-align: left;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          font-weight: normal;
          font-size: inherit;
          margin: 0;
          padding: 0;
          display: inline;
        }

        .visible_arrow {
          display: inline;
          float: right;

          img {
            width: 12px;
          }
        }
      }

      .proj_item-right {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
        opacity: 0;
        padding-left: 1rem;

        .proj_year {
          font-size: 1rem;
          min-width: 45px;
          text-align: left;
        }

        .proj_ambiti {
          padding-left: 1rem;
          display: none;
          font-size: 0.75rem;
          align-items: center;

          div {
            position: relative;
            padding: 0 12px;

            &::after {
              position: absolute;
              content: '/';
              font-size: 0.6rem;
              width: 1px;
              right: 4px;
            }
          }
        }
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
      font-weight: 800;
      padding: 10px 0;
    }
  }

  .vertical-line {
    left: 80% !important;
  }

  @media only screen and (min-width: 1100px) {
    h1, h2 {
      margin: 0 40% 2rem 0;
      padding-left: 2rem;
    }

    .proj_content li a {
      font-size: 1.5rem;
      padding: 17px 0 19px 0;
    }

    .proj_content .block__link .proj_item-left {
      width: 60%;
      padding: 0 1rem 0 2rem;
      
      .visible_arrow img {
        width: 15px;
      }
    }

    .vertical-line {
      left: 60% !important;
    }

    .proj_content .block__link .proj_item-right .proj_ambiti {
      display: flex;
      flex-wrap: wrap;
    }
  }
`

const ProjectsList = ({data}) => {
  useEffect(() => {
    if(typeof window !== `undefined`) {
      const menuTL = new TimelineLite();
      menuTL.fromTo("h1", 1, {translateX: -60, opacity: 0}, {translateX: 0, opacity: 1, ease: "power4.out"})
      .fromTo(".proj_item-left, .proj_item-right", 1, {translateY: 100, opacity: 0}, {
        translateY: 0,
        opacity: 1,
        stagger: 0.04,
        ease: "power4.out"
      }, 0.3)
      .fromTo(".divider", 0.6, { opacity: 0 }, { opacity: 1, ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 "), stagger: 0.04}, 0)
      .fromTo(".last_divider", 0.6, { opacity: 0 }, { opacity: 1, ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 ")}, "-=0.9")
      .fromTo(".pseudo.content", 0.2, {overflow: "hidden"}, {overflow: "visible"}, ">")

      const fadeInController = new ScrollMagic.Controller();

      if(document.querySelectorAll(".fade-in").length !== 0) {


        document.querySelectorAll(".fade-in").forEach(fadeInItem => {
          let TextRevealTL = new TimelineLite();
          TextRevealTL.fromTo(fadeInItem,
            {
              opacity: 0,
              y: 50
            },
            {
              duration: 1.5,
              opacity: 1,
              y: 0,
              ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"),
          })

          new ScrollMagic.Scene({
              triggerElement: fadeInItem,
              triggerHook: 0,
              offset: -600,
              reverse: false
          })
          .setTween(TextRevealTL)
          .addTo(fadeInController);
        });
      }
    }
  })

  const projectsRef = useRef(null)

  useEffect(() => {
    if(projectsRef) {
      const projects = projectsRef.current.querySelectorAll("li")

      projects.forEach(proj_li => {
        proj_li.addEventListener('mouseover', () => {
          projectsRef.current.querySelectorAll("li").forEach(
            li => {
              li.querySelector("a").style.opacity = "0.5"
              li.querySelector("span").style.opacity = "0.5"
              document.querySelector(".vertical-line").style.opacity = "0.5"
              projectsRef.current.querySelector(".last_divider").style.opacity = "0.5"
            })
          proj_li.querySelector("a").style.opacity = "1"
        })
        proj_li.addEventListener('mouseout', () => {
          projectsRef.current.querySelectorAll("li").forEach(
            li => {
              li.querySelector("a").style.opacity = "1"
              li.querySelector("span").style.opacity = "1"
              document.querySelector(".vertical-line").style.opacity = "1"
          projectsRef.current.querySelector(".last_divider").style.opacity = "1"
        })
      })
      })
    }
  }, [projectsRef])

  useEffect(() => {
    projectHover()
  })

  return (
    <>
      <ProjectsContainer>
        <VerticalLine style={{left: "60%"}} className="vertical-line"/>
        <h1>Progetti</h1>
        <ul className="proj_content" ref={projectsRef}>
          {
            data.wordpress.projects &&
            data.wordpress.projects.nodes
            .sort((a, b) => (a.date < b.date) ? 1 : (a.date === b.date) ? ((a.title > b.title) ? 1 : -1) : -1 )
            .map(proj => (
              <li
                key={`${proj.id}-${proj.slug}-${Math.floor(Math.random() * (100 - 999) + 100)}`}
                className="pseudo content"
                data-fx="1"
                data-img={proj.featuredImage ? proj.featuredImage.node.link : fallbackImg}
              >
                <Link
                  to={`/progetti/${proj.slug}`}
                  className={`block__link ${!proj.custom_post_type_Project.visitabile && 'no_link'}`}
                  >
                  <div className="proj_item-left prog_list-item">
                    <h3>{proj.title}</h3>
                    {
                      proj.custom_post_type_Project.visitabile &&
                      <div className="visible_arrow"><img src={ArrowTopRight} alt="active link"/></div>
                    }
                  </div>
                  <div className="proj_item-right">
                    <div className="proj_year">
                      {proj.custom_post_type_Project.anno && proj.custom_post_type_Project.anno}
                    </div>
                    <div className="proj_ambiti">
                      {
                        proj.custom_post_type_Project.ambiti &&
                        proj.custom_post_type_Project.ambiti.map(ambito => (
                          <div key={`${ambito}-${Math.floor(Math.random() * (100 - 999) + 100)}`}>{ambito}</div>
                        ))
                      }
                    </div>
                  </div>
                </Link>
                <span className="divider"></span>
              </li>
            ))
          }
          <span className="last_divider"></span>
        </ul>
      </ProjectsContainer>
    </>
  )
}

export default ProjectsList