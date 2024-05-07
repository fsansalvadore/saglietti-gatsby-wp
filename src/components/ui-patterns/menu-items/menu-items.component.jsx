import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { gsap } from "gsap"
import { TweenLite, TimelineLite } from "gsap/all"

import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"

import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import CustomEase from "../../common/vendor/gsap/CustomEase"
import styled from "styled-components"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CSSRulePlugin, CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const NavLinks = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;

  span {
    display: none;
    width: 3%;
    height: 3px;
    will-change: opacity, width;
    transition: opacity 0.2s ease;

    hr {
      height: 0;
      margin: 0;
      border-bottom: 3px solid #000;
      width: 100%;
    }

    @media (min-width: 900px) {
      display: inline;
    }
  }

  .menu-link {
    margin: 2vh 6vw;
    overflow: hidden;
    padding: 10px 0;
    will-change: opacity, width;
    transition: opacity 0.2s ease;

    a {
      display: inline-block;
      font-size: 4vw;
      line-height: 100%;
      text-decoration: none;
      margin: 0;
    }
  }

  @media (max-width: 900px) {
    margin-top: 0px;
    flex-direction: column;

    span {
      width: 10%;
      border-bottom: 1px solid #000;
    }

    .menu-link {
      margin: 0 2vw;

      a {
        padding: 10px 6px;
        font-size: 1.8rem;
      }
    }
  }
`

const MenuItems = ({ isOpen }) => {
  useEffect(() => {
    if (typeof window !== `undefined`) {
      if (isOpen) {
        const menuTL = gsap.timeline()
        menuTL
          .fromTo(
            ".menu-link a",
            1,
            { y: 70, skewY: 5, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.2,
              skewY: 0,
              ease: CustomEase.create(
                "custom",
                "M0,0 C0,0.566 0.07,0.674 0.228,0.822 0.42,1.002 0.818,1.001 1,1",
              ),
            },
          )
          .fromTo(
            ".menu-item-divider hr",
            0.3,
            { width: 0 },
            {
              width: "100%",
              stagger: 0.3,
            },
            0.4,
          )
      }
    }
  })

  const menuLinksRef = useRef(null)

  useEffect(() => {
    const menuLinks = menuLinksRef.current.querySelectorAll(".menu-link")

    menuLinks.forEach(menuLink => {
      menuLink.addEventListener("mouseover", () => {
        menuLinksRef.current.querySelectorAll(".menu-link").forEach(el => {
          el.style.opacity = "0.25"
          menuLinksRef.current
            .querySelectorAll("span")
            .forEach(span => (span.style.opacity = "0.25"))
        })
        menuLink.style.opacity = "1"
      })
      menuLink.addEventListener("mouseout", () =>
        menuLinksRef.current.querySelectorAll(".menu-link").forEach(el => {
          el.style.opacity = "1"
          menuLinksRef.current
            .querySelectorAll("span")
            .forEach(span => (span.style.opacity = "1"))
        }),
      )
    })
  }, [menuLinksRef])

  return (
    <NavLinks isOpen={isOpen} ref={menuLinksRef}>
      <div className="link-container menu-link">
        <Link to="/studio" className="">
          Studio
        </Link>
      </div>
      <span className="menu-item-divider">
        <hr />
      </span>
      <div className="link-container menu-link">
        <Link to="/progetti" className="">
          Progetti
        </Link>
      </div>
      <span className="menu-item-divider">
        <hr />
      </span>
      <div className="link-container menu-link">
        <Link href="mailto:info@saglietti.it" className="">
          Contatti
        </Link>
      </div>
    </NavLinks>
  )
}

export default MenuItems
