import React, { useEffect, useRef } from "react"
import { Link, navigate } from "gatsby"
import { gsap } from "gsap"
import { TweenLite, TimelineLite } from "gsap/all"

import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"

import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import CustomEase from "../../common/vendor/gsap/CustomEase"
import { useInfoSheet } from "../InfoSheet/InfoSheetProvider"
import { useTranslation } from "../../../hooks/useTranslation"
import { useLanguage } from "../../../contexts/LanguageContext"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CSSRulePlugin, CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const linkClasses =
  "inline-block text-2xl min-[900px]:text-[4vw] leading-none no-underline m-0 py-2.5 px-1.5 min-[900px]:py-0 min-[900px]:px-0 transition-opacity duration-200"

const menuLinkClasses =
  "link-container menu-link my-0 mx-[2vw] min-[900px]:my-[2vh] min-[900px]:mx-[6vw] overflow-hidden py-2.5 px-0 transition-opacity duration-200"

const dividerClasses =
  "menu-item-divider hidden min-[900px]:inline w-[10%] min-[900px]:w-[3%] h-[3px] border-b border-black min-[900px]:border-b-0 transition-opacity duration-200"

const MenuItems = ({ isOpen }) => {
  const { setIsOpen: setInfoSheetOpen } = useInfoSheet()
  const { t } = useTranslation()
  const { language } = useLanguage()

  const handleLanguageToggle = () => {
    if (typeof window === "undefined") return
    let currentPath = window.location.pathname
    if (currentPath.endsWith("/") && currentPath.length > 1) {
      currentPath = currentPath.slice(0, -1)
    }
    const newLanguage = language === "it" ? "en" : "it"
    let targetPath = "/"
    if (newLanguage === "en") {
      if (currentPath === "/" || currentPath === "") targetPath = "/en"
      else if (currentPath === "/chi-siamo") targetPath = "/en/about"
      else if (currentPath.startsWith("/progetti/")) {
        const slug = currentPath.replace("/progetti/", "")
        targetPath = `/en/projects/${slug}`
      } else if (currentPath === "/progetti") targetPath = "/en/projects"
      else if (currentPath === "/privacy") targetPath = "/en/privacy"
      else targetPath = "/en"
    } else {
      if (currentPath === "/en" || currentPath === "") targetPath = "/"
      else if (currentPath === "/en/about") targetPath = "/chi-siamo"
      else if (currentPath.startsWith("/en/projects/")) {
        const slug = currentPath.replace("/en/projects/", "")
        targetPath = `/progetti/${slug}`
      } else if (currentPath === "/en/projects") targetPath = "/progetti"
      else if (currentPath === "/en/privacy") targetPath = "/privacy"
      else targetPath = "/"
    }
    navigate(targetPath)
  }

  useEffect(() => {
    if (typeof window !== `undefined`) {
      if (isOpen) {
        const menuTL = gsap.timeline()
        menuTL
          .fromTo(
            ".menu-link a, .menu-link button",
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
    if (!menuLinksRef.current) return
    const menuLinks = menuLinksRef.current.querySelectorAll(".menu-link")

    menuLinks.forEach(menuLink => {
      menuLink.addEventListener("mouseover", () => {
        menuLinksRef.current.querySelectorAll(".menu-link").forEach(el => {
          el.style.opacity = "0.25"
        })
        menuLinksRef.current.querySelectorAll("span").forEach(span => {
          span.style.opacity = "0.25"
        })
        menuLink.style.opacity = "1"
      })
      menuLink.addEventListener("mouseout", () => {
        menuLinksRef.current.querySelectorAll(".menu-link").forEach(el => {
          el.style.opacity = "1"
        })
        menuLinksRef.current.querySelectorAll("span").forEach(span => {
          span.style.opacity = "1"
        })
      })
    })
  }, [])

  return (
    <nav
      ref={menuLinksRef}
      className="w-full flex flex-col min-[900px]:flex-row justify-center items-center mt-0"
    >
      <div className={menuLinkClasses}>
        <Link
          to={language === "en" ? "/en/about" : "/chi-siamo"}
          className={linkClasses}
        >
          {t("nav.about")}
        </Link>
      </div>
      <span className={dividerClasses}>
        <hr className="h-0 m-0 border-b-[3px] border-black w-full" />
      </span>
      <span className={dividerClasses}>
        <hr className="h-0 m-0 border-b-[3px] border-black w-full" />
      </span>
      <div className={menuLinkClasses}>
        <Link
          to={language === "en" ? "/en/projects" : "/progetti"}
          className={linkClasses}
        >
          {t("nav.projects")}
        </Link>
      </div>
      <span className={dividerClasses}>
        <hr className="h-0 m-0 border-b-[3px] border-black w-full" />
      </span>
      <div className={menuLinkClasses}>
        <button
          type="button"
          onClick={() => setInfoSheetOpen(true)}
          className={linkClasses}
        >
          {t("nav.contact")}
        </button>
      </div>
      <span className={dividerClasses}>
        <hr className="h-0 m-0 border-b-[3px] border-black w-full" />
      </span>
      <div className={menuLinkClasses}>
        <button
          type="button"
          onClick={handleLanguageToggle}
          className="border rounded-full py-0.5 px-1 text-medium flex items-center transition-opacity duration-200"
          aria-label={
            language === "it" ? "Switch to English" : "Passa all'italiano"
          }
        >
          {language === "it" && <span className="px-1">IT</span>}
          <div className="h-5 w-5 rounded-full bg-black" />
          {language !== "it" && <span className="px-1">EN</span>}
        </button>
      </div>
    </nav>
  )
}

export default MenuItems
