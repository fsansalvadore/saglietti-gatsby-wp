import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import VerticalLine from "../../../ui/vertical-line.component"
import projectHover from "../../../common/hooks/projectHover"
import fallbackImg from "../../../../images/fallback.png"
import ArrowTopRight from "../../../../images/icons/arrow-top-right.svg"
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

const ProjectsList = ({ data, limit = 100, showVisitableOnly, hideTitle }) => {
  const [projects, setProjects] = useState(null)
  const [term, setTerm] = useState("")

  useEffect(() => {
    if (data.wordpress.projects) {
      setProjects(
        data.wordpress.projects.nodes
          .filter(item =>
            showVisitableOnly ? item.custom_post_type_Project.visitabile : true,
          )
          .filter(
            item =>
              item.title.toLowerCase().includes(term.toLowerCase()) ||
              item.custom_post_type_Project.ambiti
                .join()
                .toLowerCase()
                .includes(term.toLowerCase()) ||
              item.custom_post_type_Project.anno.toString().includes(term) ||
              !term,
          )
          .sort((a, b) =>
            a.date < b.date
              ? 1
              : a.date === b.date
                ? a.title > b.title
                  ? 1
                  : -1
                : -1,
          )
          .slice(0, limit),
      )
    }
  }, [setProjects, term, data.wordpress.projects, limit, showVisitableOnly])

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const menuTL = new TimelineLite()
      menuTL
        .fromTo("h1", 1, { opacity: 0 }, { opacity: 1, ease: "power4.out" })
        .fromTo(
          ".proj_item-left, .proj_item-right",
          1,
          { translateY: 100, opacity: 0 },
          {
            translateY: 0,
            opacity: 1,
            stagger: 0.04,
            ease: "power4.out",
          },
          0.3,
        )
        .fromTo(
          ".divider",
          0.6,
          { opacity: 0 },
          {
            opacity: 1,
            ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 "),
            stagger: 0.04,
          },
          0,
        )
        .fromTo(
          ".last_divider",
          0.6,
          { opacity: 0 },
          {
            opacity: 1,
            ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 "),
          },
          "-=0.9",
        )
        .fromTo(
          ".pseudo.content",
          0.2,
          { overflow: "hidden" },
          { overflow: "visible" },
          "-=1",
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
    if (projectsRef) {
      const projects = projectsRef.current.querySelectorAll("li")

      projects.forEach(proj_li => {
        proj_li.addEventListener("mouseover", () => {
          projectsRef.current.querySelectorAll("li").forEach(li => {
            li.querySelector("a").style.opacity = "0.5"
            li.querySelector("span").style.opacity = "0.5"
            document.querySelector(".vertical-line").style.opacity = "0.5"
            projectsRef.current.querySelector(".last_divider").style.opacity =
              "0.5"
          })
          proj_li.querySelector("a").style.opacity = "1"
        })
        proj_li.addEventListener("mouseout", () => {
          projectsRef.current.querySelectorAll("li").forEach(li => {
            li.querySelector("a").style.opacity = "1"
            li.querySelector("span").style.opacity = "1"
            document.querySelector(".vertical-line").style.opacity = "1"
            projectsRef.current.querySelector(".last_divider").style.opacity =
              "1"
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
      <ProjectsContainer className="border-b border-black">
        <VerticalLine className="vertical-line" />
        {!hideTitle && (
          <div className="pt-[150px]">
            <h1>Progetti</h1>
            <div className="search-form">
              <form>
                <i className="search-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6743 15.3094L11.291 11.9261M13.1188 7.53158C13.1188 10.968 10.333 13.7538 6.89657 13.7538C3.46012 13.7538 0.674316 10.968 0.674316 7.53158C0.674316 4.09512 3.46012 1.30933 6.89657 1.30933C10.333 1.30933 13.1188 4.09512 13.1188 7.53158Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </i>
                <input
                  type="text"
                  onChange={e => setTerm(e.target.value)}
                  value={term}
                  placeholder="Cerca per titolo, anno o ambito"
                />
              </form>
            </div>
          </div>
        )}
        <ul className="proj_content truncate" ref={projectsRef}>
          {projects && projects.length > 0 ? (
            projects.map(proj => (
              <li
                key={`${proj.id}-${proj.slug}-${Math.floor(
                  Math.random() * (100 - 999) + 100,
                )}`}
                className="pseudo content last:border-b"
                data-fx="1"
                data-img={
                  proj.featuredImage
                    ? proj.featuredImage.node.link
                    : fallbackImg
                }
              >
                <Link
                  to={`/progetti/${proj.slug}`}
                  className={`block__link ${
                    !proj.custom_post_type_Project.visitabile && "no_link"
                  }`}
                >
                  <div className="proj_item-left prog_list-item">
                    <h3>{proj.title}</h3>
                    {proj.custom_post_type_Project.visitabile && (
                      <div className="visible_arrow">
                        <img src={ArrowTopRight} alt="active link" />
                      </div>
                    )}
                  </div>
                  <div className="proj_item-right flex">
                    <div className="proj_year">
                      {proj.custom_post_type_Project.anno &&
                        proj.custom_post_type_Project.anno}
                    </div>
                    <div className="proj_ambiti flex-shrink truncate">
                      {proj.custom_post_type_Project.ambiti &&
                        proj.custom_post_type_Project.ambiti
                          .sort((a, b) => (a > b ? 1 : -1))
                          .map((ambito, i) => (
                            <div
                              className="mr-2"
                              key={`${ambito}-${Math.floor(
                                Math.random() * (100 - 999) + 100,
                              )}`}
                            >
                              {i !== 0 && <span className="mr-2">/</span>}
                              {ambito}
                            </div>
                          ))}
                    </div>
                  </div>
                </Link>
                <span className="divider"></span>
              </li>
            ))
          ) : (
            <li className="pseudo content">
              <span className="divider"></span>
              <Link to="/progetti" className="block__link no_link">
                <div className="proj_item-left prog_list-item">
                  <p className="not-found">Nessun progetto trovato</p>
                </div>
              </Link>
            </li>
          )}
          <span className="last_divider"></span>
        </ul>
      </ProjectsContainer>
    </>
  )
}

const ProjectsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  text-align: left;
  position: relative;
  z-index: 0;

  h1,
  h2 {
    font-family: "Inter";
    font-weight: 200;
    font-size: 1rem;
    letter-spacing: 0;
    display: inline-block;
    margin: 0 0 4.4rem 0;
    padding-left: 1rem;
    transform: tralsate3d(-60, 0, 0);
  }

  .search-form,
  form {
    display: inline-block;
    left: 1rem;
    top: 187px;
  }

  .search-form {
    position: absolute;
    margin-left: 0;

    form {
      width: calc(80vw - 2rem);
      display: flex;
      align-items: center;

      .search-icon {
        position: absolute;
        right: 0;
        padding-top: 1px;
      }

      input {
        width: 100%;
        padding: 6px 0;
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0;
        border-radius: 0;
        border: none;
        color: #000;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        &:focus {
          outline: none;
          font-size: 16px;
        }
      }
    }
  }

  .s li.pseudo.content {
    overflow: hidden;
  }

  ul,
  li {
    position: relative;
    list-style-type: none;
    margin: 0;

    a {
      display: inline-block;
      text-decoration: none;
      font-size: 1rem;
      opacity: 1;
      letter-spacing: 0;
      margin: 0;
      line-height: 1.2rem;
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
        height: 0.9px;
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
        padding: 14px 1rem 14px 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p.not-found {
          margin-top: 1rem;
          font-weight: 400;
        }
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
        line-height: 110%;
        align-items: center;
        opacity: 0;
        padding-left: 1rem;

        .proj_year {
          font-family: "Inter", sans-serif !important;
          min-width: 70px;
          text-align: left;
          margin-right: 0;
          font-weight: 400;
        }

        .proj_ambiti {
          padding: 14px 10px;
          /* font-size: 0.75rem; */
          display: none;
          align-items: center;
          border-left: 1px solid #000;

          div {
            font-weight: 400;
            font-family: "Inter";
            position: relative;
            /* padding: 0 10px; */

            /* &::before {
              position: absolute;
              content: "/";
              font-size: 0.6rem;
              width: 1px;
              left: -5px;
            }
            &:first-of-type::before {
              display: none;
            } */
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
    font-weight: 400;
    margin-top: 60px;
  }

  .extra_proj-container {
    li {
      font-size: 0.8rem;
      font-weight: 400;
      padding: 10px 0;
    }
  }

  .vertical-line {
    left: 80% !important;
  }

  @media only screen and (min-width: 1024px) {
    h1,
    h2 {
      margin: 0 0 2rem 0;
      padding-left: 2rem;
    }

    .search-form,
    form {
      display: inline-block;
      left: 50%;
      top: 150px;
    }

    .search-form {
      margin-left: 1rem;

      form {
        width: calc(40vw - 3rem);

        .search-icon {
          right: 0.8rem;
        }
      }
    }

    .proj_content li a {
      font-size: 1.5rem;
    }

    .proj_content .block__link .proj_item-left {
      width: 50%;
      padding: 0 1rem 0 2rem;

      .visible_arrow img {
        width: 15px;
      }
    }

    .vertical-line {
      left: 50% !important;
    }

    .proj_content .block__link .proj_item-right .proj_ambiti {
      display: flex;
      flex-wrap: wrap;
      padding: 19px;
    }

    .proj_content .block__link .proj_item-right .proj_year {
      margin-right: 1rem;
    }
  }
`

export default ProjectsList
