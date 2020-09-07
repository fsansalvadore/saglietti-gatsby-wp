import React from "react"
import { graphql, Link } from "gatsby"
import styled from 'styled-components'
import ArrowRight from '../../atoms/svg/arrow-right.component'
import Layout from "../../layout"
import VerticalLine from '../../atoms/vertical-line.component'
import ComponentParser from '../ComponentParser'
import fallbackImg from '../../../images/fallback.png'

import PrevNextProject from '../../molecules/prev-next-project/prev-next-project.component'
import TextRevealAnimation from '../hooks/animationTextReveal'
import { useEffect } from "react"

import { gsap } from "gsap";
import { TweenLite, TimelineLite } from "gsap/all";
import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import CustomEase from '../../particles/vendor/gsap/CustomEase'

if(typeof window !== `undefined`) {
  gsap.registerPlugin( CustomEase )
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const ProjectContainerComponent = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  border-bottom: 1px solid #000;

  .proj_info-container {
    position: sticky;
    top: 0;
    min-height: 600px;
    height: 100vh;
    width: 40vw;
    padding: 1.45rem 2rem;

    .title {
      margin-bottom: 1.45rem;

      h1 {
        font-family: 'FFMarkWebProLight';
        font-weight: 200;
        letter-spacing: -0.06rem;
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
        font-family: 'FFMarkWebProLight';
        font-size: 0.7rem;
        line-height: 1rem;

        h2 {
          font-weight: 200;
          font-size: inherit;
          margin-bottom: 0;
          line-height: inherit;
        }
        p {
          margin: 0;
          line-height: inherit;
        }
        ul, li {
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

    a, svg {
      display: inline;
    }

    a, span {
      text-decoration: none;
      font-size: 0.7rem;
      font-weight: 200;
      letter-spacing: -0.02rem;
    }

    svg {
      margin: 0 10px;
    }
  }

  .proj_content-container {
    position: relative;
    width: 60vw;
    min-height: 100vh;
    overflow: hidden;

    .proj_cover {
      width: 100%;
      min-height: 300px;
      height: 50vh;
      
      .proj_cover-img {
        width: 100%;
        height: 100%;
        background-position: center;
        background-color: #ddd;
        animation-name: coverReveal;
        animation-duration: 1.6s;
        animation-timing-function: cubic-bezier(0,0,.01,1);
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
`

const ProjectPage = (props) => {
  const {
    blocks,
    custom_post_type_Project,
    index,
    featuredImage
  } = props.pageContext;
  const {data} = props;
  let prevPost = null
  let nextPost = null
  const postLength = data.wordpress.projects.nodes.length

  if (index === postLength - 1) {
    prevPost = data.wordpress.projects.nodes[index - 1]
    nextPost = data.wordpress.projects.nodes[0]
  } else if (index === 0) {
    prevPost = data.wordpress.projects.nodes[postLength - 1]
    nextPost = data.wordpress.projects.nodes[index + 1]
  } else {
    prevPost = data.wordpress.projects.nodes[index - 1]
    nextPost = data.wordpress.projects.nodes[index + 1]
  }

  useEffect(() => {
    if(typeof window !== `undefined`) {
      if(document.querySelectorAll(".fade-in").length !== 0) {
        const fadeController = new ScrollMagic.Controller();

        document.querySelectorAll(".fade-in").forEach(fadeInItem => {
          let TextRevealTL = new TimelineLite();
          TextRevealTL.fromTo(fadeInItem,
            {
              opacity: 0,
              // y: 50
            },
            {
              duration: 1,
              opacity: 1,
              // y: 0,
              ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"),
          })

          new ScrollMagic.Scene({
              triggerElement: fadeInItem,
              triggerHook: 0,
              offset: -600,
              reverse: false
          })
          .setTween(TextRevealTL)
          .addTo(fadeController);
        });
      }
    }
  })
  
  return (
    <Layout>
      <ProjectContainerComponent>
        <div className="proj_info-container flex align-center">
          <div className="proj_info-block">
            <TextRevealAnimation addClass="title">
              <h1 className="TextRevealItem">{custom_post_type_Project.titolo}</h1>
            </TextRevealAnimation>
            <div className="proj_details-container fade-in">
              {
                custom_post_type_Project.credits && custom_post_type_Project.credits.length > 0 &&
                  <div className="proj_details-block">
                    <h2>Credits</h2>
                    <p>{custom_post_type_Project.credits}</p>
                  </div>
              }
              {
                custom_post_type_Project.anno && custom_post_type_Project.anno.length !== null &&
                  <div className="proj_details-block">
                    <h2>Anno</h2>
                    <p>{custom_post_type_Project.anno}</p>
                  </div>
              }
              {
                custom_post_type_Project.ambiti && custom_post_type_Project.ambiti.length > 0 &&
                  <div className="proj_details-block">
                    <h2>Ambiti</h2>
                    <ul>
                      {custom_post_type_Project.ambiti.map(ambito => (
                        <li key={`${ambito}-${Math.floor(Math.random() * (100 - 999) + 100)}`}>{ambito}</li>
                      ))}
                    </ul>
                  </div>
              }
            </div>
          </div>
          <div className="proj_breadbrumbs">
            <Link to="/">Home</Link>
            <ArrowRight/>
            <Link to="/progetti/">Progetti</Link>
            <ArrowRight/>
            <span>{custom_post_type_Project.titolo}</span>
          </div>
        </div>
        <VerticalLine initial={{x: "0"}} animate={{ x: 0 }} transition={{ duration: 0.8 }} style={{left: "40%"}} />
        <div className="proj_content-container">
          <div className="proj_cover">
            <div className="proj_cover-img" style={{backgroundImage: `url(${featuredImage ? featuredImage.node.link : fallbackImg})`}}></div>
          </div>
          <ComponentParser content={blocks}/>
        </div>
      </ProjectContainerComponent>
      <PrevNextProject prev={prevPost} next={nextPost}/>
    </Layout>
  )
}

export const query = graphql`
  query PrevNextQuery {
    wordpress {
      projects {
        nodes {
          id
          title
          date
          slug
        }
      }
    }
  }
`

export default ProjectPage