import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import ArrowRight from "../../atoms/svg/arrow-right.component"
import Layout from "../../layout"
import VerticalLine from "../../atoms/vertical-line.component"
import ComponentParser from "../ComponentParser"
import fallbackImg from "../../../images/fallback.png"
import PrevNextProject from "../../molecules/prev-next-project/prev-next-project.component"
import TextRevealAnimation from "../hooks/animationTextReveal"
import BackgroundImage from "gatsby-background-image"

import { gsap } from "gsap"
import { TweenLite, TimelineLite } from "gsap/all"
import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import CustomEase from "../../particles/vendor/gsap/CustomEase"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const ProjectContainerComponent = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  min-height: ${props => (props.vh ? `calc(var(--vh, 1vh) * 100)` : "90vh")};
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;

  .proj_info-container {
    position: relative;
    top: 0;
    height: calc(var(--vh, 1vh) * 100);
    min-height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    padding: 1.45rem 2rem;

    .title {
      margin-bottom: 1.45rem;

      h1 {
        font-family: "ff-real-text-pro";
        font-weight: 200;
        letter-spacing: 0;
        margin: 0;
      }
    }

    .proj_info-block {
      width: 100%;
    }

    .proj_details-container {
      display: flex;

      .proj_details-block {
        width: 25%;
        margin-right: 10px;
        font-family: "ff-real-headline-pro-2";
        font-size: 0.7rem;
        line-height: 1rem;

        h2 {
          font-weight: 400;
          font-size: inherit;
          margin-bottom: 0;
          line-height: inherit;
        }
        p {
          margin: 0;
          line-height: inherit;
        }
        ul,
        li {
          margin: 0;
          line-height: inherit;
          padding: 0;
          list-style-type: none;
        }
      }
    }
  }

  .proj_breadbrumbs {
    position: absolute;
    bottom: 30px;
    left: 2rem;

    a,
    svg {
      display: inline;
    }

    a,
    span {
      text-decoration: none;
      font-size: 0.7rem;
      font-weight: 200;
      letter-spacing: 0;
    }

    svg {
      margin: 0 10px;
    }
  }

  .proj_content-container {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;

    .proj_cover {
      width: 100%;
      min-height: 300px;
      height: 50vh;

      .proj_cover-img {
        width: 100% !important;
        height: 100% !important;
        background-position: center;
        background-size: cover;
        background-color: #ddd;
        animation-name: coverReveal;
        animation-duration: 1.6s;
        animation-timing-function: cubic-bezier(0, 0, 0.01, 1);
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes coverReveal {
    0% {
      height: 0%;
      background-size: 150% auto;
    }
    100% {
      height: 100%;
      background-size: 100% auto;
    }
  }

  .vertical_line {
    display: none;
  }

  @media (min-width: 900px) {
    flex-direction: row;

    .proj_info-container {
      width: 40vw;
      position: sticky;
    }

    .proj_content-container {
      width: 60vw;
    }

    .vertical_line {
      display: block;
    }
  }
`

const ProjectPage = props => {
  const {
    slug,
    blocks,
    custom_post_type_Project,
    index,
    title,
    featuredImage,
    seo,
    tags,
  } = props.pageContext
  const { data } = props
  let prevPost = null
  let nextPost = null
  const sortedProjects = data.wordpress.projects.nodes
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
  const postLength = sortedProjects.length
  if (index === postLength - 1) {
    prevPost = sortedProjects[index - 1]
    nextPost = sortedProjects[0]
  } else if (index === 0) {
    prevPost = sortedProjects[postLength - 1]
    nextPost = sortedProjects[index + 1]
  } else {
    prevPost = sortedProjects[index - 1]
    nextPost = sortedProjects[index + 1]
  }

  let vh = null
  if (typeof window !== `undefined`) {
    vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)

    window.addEventListener("resize", () => {
      vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    })
  }

  useEffect(() => {
    if (typeof window !== `undefined`) {
      if (document.querySelectorAll(".fade-in").length !== 0) {
        const fadeController = new ScrollMagic.Controller()

        document.querySelectorAll(".fade-in").forEach(fadeInItem => {
          let TextRevealTL = new TimelineLite()
          TextRevealTL.fromTo(
            fadeInItem,
            {
              opacity: 0,
            },
            {
              duration: 1,
              opacity: 1,
              ease: CustomEase.create(
                "custom",
                "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"
              ),
            }
          )

          new ScrollMagic.Scene({
            triggerElement: fadeInItem,
            triggerHook: 0,
            offset: -600,
            reverse: false,
          })
            .setTween(TextRevealTL)
            .addTo(fadeController)
        })
      }
    }
  })

  return (
    <Layout>
      <Helmet>
        <title>{title} • Saglietti</title>
        <meta name="description" content={`${seo?.metaDesc}`} />
        <meta
          name="keywords"
          content={
            tags
              ? tags.nodes.map(tag => (tag.name ? ` ${tag.name}` : ""))
              : "saglietti, portfolio, studio di design, progetti di design"
          }
        />
        <meta
          itemprop="image"
          content={`${featuredImage ? featuredImage.node.link : fallbackImg})`}
        />
        <meta property="og:site_name" content={`${title} • Saglietti`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.saglietti.it/progetti/${slug}`}
        />
        <meta property="og:title" content={`${title} • Saglietti`} />
        <meta
          property="og:image"
          content={`${featuredImage ? featuredImage.node.link : fallbackImg})`}
        />
        <meta property="og:description" content={`${seo?.metaDesc}`} />
        <meta property="og:locale" content="it_IT" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:site"
          content={`https://www.saglietti.it/progetti/${slug}`}
        />
        <meta name="twitter:title" content={`${title} • Saglietti`} />
        <meta name="twitter:description" content={`${seo?.metaDesc}`} />
        <meta
          name="twitter:image"
          content={`${featuredImage ? featuredImage.node.link : fallbackImg})`}
        />
      </Helmet>
      <ProjectContainerComponent vh={vh}>
        <div className="proj_info-container flex align-center">
          <div className="proj_info-block">
            <TextRevealAnimation addClass="title">
              <h1 className="TextRevealItem">{title}</h1>
            </TextRevealAnimation>
            <div className="proj_details-container fade-in">
              {custom_post_type_Project.anno &&
                custom_post_type_Project.anno.length !== null && (
                  <div className="proj_details-block">
                    <h2>Anno</h2>
                    <p>{custom_post_type_Project.anno}</p>
                  </div>
                )}
              {custom_post_type_Project.ambiti &&
                custom_post_type_Project.ambiti.length > 0 && (
                  <div className="proj_details-block">
                    <h2>Ambiti</h2>
                    <ul>
                      {custom_post_type_Project.ambiti.map(ambito => (
                        <li
                          key={`${ambito}-${Math.floor(
                            Math.random() * (100 - 999) + 100
                          )}`}
                        >
                          {ambito}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {custom_post_type_Project.credits &&
                custom_post_type_Project.credits.length > 0 && (
                  <div className="proj_details-block">
                    <h2>Credits</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: custom_post_type_Project.credits,
                      }}
                    />
                  </div>
                )}
            </div>
          </div>
          <div className="proj_breadbrumbs">
            <Link to="/">Home</Link>
            <ArrowRight />
            <Link to="/progetti/">Progetti</Link>
            <ArrowRight />
            <span>{title}</span>
          </div>
        </div>
        <VerticalLine style={{ left: "40%" }} className="vertical_line" />
        <div className="proj_content-container">
          <div className="proj_cover">
            {/* <div className="proj_cover-img" style={{backgroundImage: `url(${featuredImage ? featuredImage.node.link : fallbackImg})`}}></div> */}
            {featuredImage ? (
              featuredImage.node.imageFile &&
              !featuredImage.node.sourceUrl.includes(".gif") ? (
                <BackgroundImage
                  className="proj_cover-img"
                  fixed={featuredImage.node.imageFile.childImageSharp.fixed}
                />
              ) : (
                <div
                  className="proj_cover-img"
                  style={{
                    backgroundImage: `url(${featuredImage.node.sourceUrl})`,
                  }}
                />
              )
            ) : (
              <div
                className="proj_cover-img"
                style={{ backgroundImage: `url(${fallbackImg})` }}
              />
            )}
          </div>
          <ComponentParser content={blocks} />
        </div>
      </ProjectContainerComponent>
      <PrevNextProject prev={prevPost} next={nextPost} />
    </Layout>
  )
}

export const query = graphql`
  query PrevNextQuery {
    wordpress {
      projects(first: 100, where: { status: PUBLISH }) {
        nodes {
          id
          title
          date
          slug
          custom_post_type_Project {
            anno
            visitabile
          }
          featuredImage {
            node {
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
        }
      }
    }
  }
`

export default ProjectPage
