import React, { useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import Layout from "../../layout"
import { components } from "../ComponentParser"
import fallbackImg from "../../../images/fallback.png"
import PrevNextProject from "../../ui-patterns/prev-next-project/prev-next-project.component"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { gsap } from "gsap"
import { TweenLite, TimelineLite } from "gsap/all"
import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import CustomEase from "../../common/vendor/gsap/CustomEase"
import cn from "classnames"
if (typeof window !== `undefined`) {
  gsap.registerPlugin(CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const ProjectContainerComponent = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;

  .proj_info-container {
    padding: 1.45rem 2rem;

    h1 {
      font-family: "Inter";
      font-weight: 200;
      letter-spacing: 0;
      margin: 0;
    }

    .proj_info-block {
      width: 100%;
    }

    .proj_details-container {
      display: flex;

      .proj_details-block {
        width: 25%;
        margin-right: 10px;
        font-family: "Inter";
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

    .vertical_line {
      display: block;
    }
  }
`

const CarouselContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .slick-slide,
  .slick-list {
    position: relative;
    height: 100%;
  }

  .slick-slide img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  .image-count {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    font-size: 1rem;
  }

  .info-icon {
    position: absolute;
    z-index: 20;
    bottom: 20px;
    right: 20px;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
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
  const sliderRef = useRef(null)
  const leftArrowRef = useRef(null)
  const rightArrowRef = useRef(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

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
          : -1,
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
            .addTo(fadeController)
        })
      }
    }
  })

  const handleOpenSheet = () => setIsSheetOpen(true)

  const _blocks = blocks.filter(block => !!block.attributes)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Layout className="border-b">
      <Helmet>
        <title>{title} • Saglietti</title>
        <meta name="description" content={seo.metaDesc} />
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
          content={featuredImage ? featuredImage.node.link : fallbackImg}
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
          content={featuredImage ? featuredImage.node.link : fallbackImg}
        />
        <meta property="og:description" content={seo.metaDesc} />
        <meta property="og:locale" content="it_IT" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:site"
          content={`https://www.saglietti.it/progetti/${slug}`}
        />
        <meta name="twitter:title" content={`${title} • Saglietti`} />
        <meta name="twitter:description" content={seo.metaDesc} />
        <meta
          name="twitter:image"
          content={featuredImage ? featuredImage.node.link : fallbackImg}
        />
      </Helmet>
      <ProjectContainerComponent className="overflow-hidden" vh={vh}>
        <CarouselContainer className="h-full relative">
          <button
            ref={leftArrowRef}
            className="hidden md:block absolute z-10 inset-0 right-auto w-1/2 h-full"
            onClick={() => sliderRef?.current?.slickGoTo(activeSlide - 1)}
          />
          <button
            ref={rightArrowRef}
            className="hidden md:block absolute z-10 inset-0 left-auto w-1/2 h-full"
            onClick={() => sliderRef?.current?.slickGoTo(activeSlide + 1)}
          />
          <Slider
            ref={sliderRef}
            afterChange={newIndex => {
              setActiveSlide(newIndex)
            }}
            className="h-full"
            {...settings}
          >
            {_blocks?.map((block, index) => {
              const Component = components[block.name]

              if (!Component) return null

              return (
                <div key={index} className="w-full h-full min-h-screen">
                  <Component
                    {...block}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )
            })}
          </Slider>
          <div className="image-count">
            {activeSlide + 1} / {_blocks.length}
          </div>
          <button className="info-icon absolute z-30" onClick={handleOpenSheet}>
            INFO
          </button>
        </CarouselContainer>
        <InfoSheet
          isOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          custom_post_type_Project={custom_post_type_Project}
          title={title}
        />
      </ProjectContainerComponent>
      <PrevNextProject prev={prevPost} next={nextPost} />
    </Layout>
  )
}

const InfoSheet = ({
  isOpen,
  setIsSheetOpen,
  custom_post_type_Project,
  title,
}) => {
  return (
    <div
      className={cn(
        "proj_info-container absolute z-20 flex flex-col gap-2 inset-0 top-auto w-full h-fit bg-white translate-y-full transform transition-transform",
        isOpen && "!translate-y-0",
      )}
    >
      <button
        className="absolute right-4 bottom-4 text-lg w-fit h-7 uppercase"
        onClick={() => setIsSheetOpen(false)}
      >
        Close
      </button>
      <h1>{title}</h1>
      <div className="flex flex-col gap-2 lg:gap-4">
        {custom_post_type_Project.descrizione &&
          custom_post_type_Project.descrizione.length !== null && (
            <div className="proj_details-block">
              <p
                dangerouslySetInnerHTML={{
                  __html: custom_post_type_Project.descrizione,
                }}
              />
            </div>
          )}
        {custom_post_type_Project.anno &&
          custom_post_type_Project.anno.length !== null && (
            <div className="proj_details-block">
              {/* <h2 className="!m-0">Anno</h2> */}
              <p className="!m-0">{custom_post_type_Project.anno}</p>
            </div>
          )}
        {custom_post_type_Project.ambiti &&
          custom_post_type_Project.ambiti.length > 0 && (
            <div className="proj_details-block">
              {/* <h2 className="!m-0">Ambiti</h2> */}
              <ul className="!m-0">
                {custom_post_type_Project.ambiti.map(ambito => (
                  <li
                    key={`${ambito}-${Math.floor(
                      Math.random() * (100 - 999) + 100,
                    )}`}
                    className="!m-0"
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
              {/* <h2 className="!m-0 !mb-1">Credits</h2> */}
              <p
                dangerouslySetInnerHTML={{
                  __html: custom_post_type_Project.credits,
                }}
              />
            </div>
          )}
      </div>
    </div>
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
