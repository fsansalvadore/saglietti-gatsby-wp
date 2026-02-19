import "./nav.styles.scss"
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Menu from "../menu-container/menu-container.component"
import styled from "styled-components"
import { Link, navigate } from "gatsby"
import NavLogo from "./NavLogo.component"
import cn from "classnames"
import { useLockBodyScroll, useWindowSize } from "react-use"
import { useInfoSheet } from "../InfoSheet/InfoSheetProvider"
import { useLanguage } from "../../../contexts/LanguageContext"
import { useTranslation } from "../../../hooks/useTranslation"
import useHasScrolled from "../../../hooks/useHasScrolled"

const MenuBtn = styled.a`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: pointer;
  will-change: transform;
  transition: transform 0.2s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.06) !important;
  }

  span {
    position: absolute;
    width: 18px;
    height: 1px;
    background-color: #000;
    transition: transform 0.5s cubic-bezier(0.9, 0, 0, 0.9);
  }

  span:first-of-type {
    transform: ${props =>
      props.isOpen
        ? "translate3d(0, 0px, 0) rotate(45deg)"
        : "translate3d(0, -4px, 0) rotate(0deg)"};
  }

  span:last-of-type {
    transform: ${props =>
      props.isOpen
        ? "translate3d(0, 0px, 0) rotate(-45deg)"
        : "translate3d(0, 4px, 0) rotate(0deg)"};
  }
`

const Nav = ({ initialTransparent = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const { setIsOpen: setInfoSheetOpen, isOpen: infoSheetOpen } = useInfoSheet()
  const [hasScrolled, setHasScrolled] = useHasScrolled()

  useLockBodyScroll(isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [width])

  const handleLanguageToggle = () => {
    if (typeof window === "undefined") return

    let currentPath = window.location.pathname
    // Remove trailing slash for consistent matching
    if (currentPath.endsWith("/") && currentPath.length > 1) {
      currentPath = currentPath.slice(0, -1)
    }

    const newLanguage = language === "it" ? "en" : "it"
    let targetPath = "/"

    if (newLanguage === "en") {
      // Switching to English
      if (currentPath === "/" || currentPath === "") {
        targetPath = "/en"
      } else if (currentPath === "/chi-siamo") {
        targetPath = "/en/about"
      } else if (currentPath.startsWith("/progetti/")) {
        // Project detail page: /progetti/slug -> /en/projects/slug
        const slug = currentPath.replace("/progetti/", "")
        targetPath = `/en/projects/${slug}`
      } else if (currentPath === "/progetti") {
        targetPath = "/en/projects"
      } else if (currentPath === "/privacy") {
        targetPath = "/en/privacy"
      } else {
        targetPath = "/en"
      }
    } else {
      // Switching to Italian
      if (currentPath === "/en" || currentPath === "") {
        targetPath = "/"
      } else if (currentPath === "/en/about") {
        targetPath = "/chi-siamo"
      } else if (currentPath.startsWith("/en/projects/")) {
        // Project detail page: /en/projects/slug -> /progetti/slug
        const slug = currentPath.replace("/en/projects/", "")
        targetPath = `/progetti/${slug}`
      } else if (currentPath === "/en/projects") {
        targetPath = "/progetti"
      } else if (currentPath === "/en/privacy") {
        targetPath = "/privacy"
      } else {
        targetPath = "/"
      }
    }

    navigate(targetPath)
  }

  const navClassName = cn(
    "flex items-center gap-2 lg:gap-4 py-2 px-4 rounded-full",
    "bg-white/90 backdrop-blur-lg border shadow-sm border-gray-100",
  )

  return (
    <>
      <nav className="fixed z-[998] px-4 top-0 flex justify-center w-full h-[100px] items-center">
        <div className="relative w-full mx-auto flex items-center justify-center">
          <div
            className={cn(
              navClassName,
              "absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
              hasScrolled
                ? "left-0 translate-x-0"
                : "left-1/2 -translate-x-[calc(100%+0.5rem)]",
            )}
            style={{
              willChange: "transform",
            }}
          >
            <NavLogo />
          </div>
          <div
            className={cn(
              navClassName,
              "absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
              hasScrolled
                ? "right-0 translate-x-0"
                : "right-1/2 translate-x-full",
            )}
            style={{
              willChange: "transform",
            }}
          >
            <MenuBtn
              className="md:!hidden"
              onClick={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
            >
              <span></span>
              <span></span>
            </MenuBtn>
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              <Link
                to={language === "en" ? "/en/about" : "/chi-siamo"}
                className="p-1"
              >
                {t("nav.about")}
              </Link>
              <Link
                to={language === "en" ? "/en/projects" : "/progetti"}
                className="p-1"
              >
                {t("nav.projects")}
              </Link>
              <button
                type="button"
                onClick={() => setInfoSheetOpen(!infoSheetOpen)}
                className="p-1 hover:underline transition-all"
              >
                {t("nav.contact")}
              </button>
              <button
                type="button"
                onClick={handleLanguageToggle}
                className={cn(
                  "border rounded-full py-0.5 px-1 text-medium flex items-center",
                )}
              >
                {language === "it" && <span className="px-1">IT</span>}
                <div
                  className={cn(
                    "h-5 w-5 rounded-full bg-black",
                    language === "it",
                  )}
                />
                {language !== "it" && <span className="px-1">EN</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Menu isOpen={isOpen} />
    </>
  )
}

Nav.propTypes = {
  siteTitle: PropTypes.string,
}

Nav.defaultProps = {
  siteTitle: `Saglietti`,
}

export default Nav
