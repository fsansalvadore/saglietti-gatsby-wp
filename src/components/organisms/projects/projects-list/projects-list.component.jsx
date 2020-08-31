import React, {useEffect} from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { gsap } from "gsap";
import { TweenLite, TimelineLite } from "gsap/all";

import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import CustomEase from '../../../particles/vendor/gsap/CustomEase'

if(typeof window !== `undefined`) {
  gsap.registerPlugin( CustomEase )
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const ProjectsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 250px auto 0 auto;
  padding: 0 25% 200px 8.3%;
  text-align: right;

  h1, h2 {
    font-family: 'FFMarkWebProLight';
    font-weight: 200;
    font-size: 1rem;
    letter-spacing: -0.03rem;
    margin-bottom: 2rem;
  }
  ul, li {
    position: relative;
    list-style-type: none;
    margin: 0;
    overflow: hidden;

    a {
      display: inline-block;
      text-decoration: none;
      font-size: 3rem;
      opacity: 0;
      letter-spacing: -0.05rem;
      margin: 0;
      line-height: 2rem;
      padding: 50px 0 60px 0;

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }
    }
  }

  .proj_content {
    li {
      position: relative;

      a {
        will-change: transform;
      }

      .divider {
        position: absolute;
        width: 0;
        height: 1px;
        background-color: #000;
        top: 0;
        right: 0;
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
      font-size: 1rem;
      font-weight: 800;
      padding: 10px 0;
    }
  }
`

const ProjectsList = ({data}) => {
  useEffect(() => {
    if(typeof window !== `undefined`) {
      const menuTL = gsap.timeline();
      menuTL.fromTo("h1", 0.7, {x: -30, opacity: 0}, {x: 0, opacity: 1, ease: "power4.out"})
      .fromTo(".prog_list-item a", 1, {translateY: 100, opacity: 0}, {
        translateY: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power4.out"
      }, 0.3)
      .fromTo(".divider", 0.6, { width: "0%" }, { width: "100%", ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 "), stagger: 0.2}, 0)
      .fromTo(".last_divider", 0.6, { width: "0%" }, { width: "100%", ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 ")}, "<1.2")

      const fadeInController = new ScrollMagic.Controller();

      if(document.querySelectorAll(".fade-in").length !== 0) {


        document.querySelectorAll(".fade-in").forEach(fadeInItem => {
          let TextRevealTL = gsap.timeline();
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

  return (
    <>
      <ProjectsContainer>
        <h1>Progetti</h1>
        <ul className="proj_content">
          {
            data.wordpress.projects &&
            data.wordpress.projects.nodes.map(proj => (
              <li key={`${proj.id}-${proj.slug}-${Math.floor(Math.random() * (100 - 999) + 100)}`} className="pseudo">
                <span className="divider"></span>
                <div className="prog_list-item">
                  <Link
                    to={`/progetti/${proj.slug}`}
                    className="block__title"
                    data-img={proj.featuredImage.node.link}
                    >{proj.title}</Link>
                </div>
              </li>
            ))
          }
          <span className="last_divider"></span>
        </ul>
        {
          data.wordpress.extra_projects && (
            <div>
              <h2>Extra</h2>
              <ul className="extra_proj-container">
                {
                  data.wordpress.extra_projects.nodes.map(extra_proj => (
                  <li key={`${extra_proj.title}-${extra_proj.date}-${Math.floor(Math.random() * (100 - 999) + 100)}`} className="fade-in">{extra_proj.title}</li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </ProjectsContainer>
    </>
  )
}

export default ProjectsList