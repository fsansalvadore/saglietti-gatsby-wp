import "./nav.styles.scss"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
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

const MD_BREAKPOINT = 768

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
  const [hasScrolled] = useHasScrolled()

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const measureRafRef = useRef(0)
  const [barDims, setBarDims] = useState({ cw: 0, tw: 0 })
  const [barMotionReady, setBarMotionReady] = useState(false)

  const isDesktop =
    typeof width === "number" && width >= MD_BREAKPOINT

  // Remeasure when language, breakpoint, or menu open state changes pill widths; ResizeObserver alone may not fire.
  // biome-ignore lint/correctness/useExhaustiveDependencies: language, width, isOpen intentionally trigger remeasure
  useLayoutEffect(() => {
    if (!isDesktop) {
      setBarDims({ cw: 0, tw: 0 })
      return
    }
    const c = containerRef.current
    if (!c) return

    const measure = () => {
      cancelAnimationFrame(measureRafRef.current)
      measureRafRef.current = requestAnimationFrame(() => {
        const t = trackRef.current
        if (!t || t.children.length < 2) return
        const cw = c.offsetWidth
        const gapStyle = getComputedStyle(t)
        const gapPx = parseFloat(gapStyle.columnGap || gapStyle.gap) || 0
        const tw =
          t.children[0].getBoundingClientRect().width +
          gapPx +
          t.children[1].getBoundingClientRect().width
        if (cw > 0 && tw > 0) {
          setBarDims({ cw, tw })
        }
      })
    }

    measure()
    requestAnimationFrame(() => requestAnimationFrame(measure))
    const ro = new ResizeObserver(measure)
    ro.observe(c)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(measureRafRef.current)
    }
  }, [isDesktop, language, width, isOpen])

  const canAnimateBar =
    isDesktop && barDims.cw > 0 && barDims.tw > 0

  // Snap first frame after dimensions exist (no tween from 0 / garbage). Re-arm when desktop bar becomes animatable again.
  useEffect(() => {
    if (!isDesktop || !canAnimateBar) {
      setBarMotionReady(false)
      return
    }
    setBarMotionReady(false)
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setBarMotionReady(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [isDesktop, canAnimateBar])

  useLockBodyScroll(isOpen)

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset mobile menu when viewport width changes
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
    "bg-white/80 backdrop-blur-lg border shadow-sm border-gray-100",
  )

  const navBarTransition = {
    type: "tween",
    duration: 0.7,
    ease: [0.4, 0, 0.2, 1],
  }

  return (
    <>
      <nav className="fixed z-[998] px-4 top-0 flex justify-center w-full h-[100px] items-center">
        <div
          ref={containerRef}
          className="relative mx-auto min-h-10 w-full max-w-full md:min-h-10 md:h-10"
        >
          <motion.div
            ref={trackRef}
            initial={false}
            className={cn(
              "flex min-h-10 items-center gap-2 lg:gap-4",
              "w-full justify-between",
              "md:absolute md:left-0 md:top-1/2 md:max-w-none",
            )}
            animate={
              isDesktop
                ? canAnimateBar
                  ? {
                      y: "-50%",
                      width: hasScrolled ? barDims.cw : barDims.tw,
                      x: hasScrolled
                        ? 0
                        : (barDims.cw - barDims.tw) / 2,
                    }
                  : { y: "-50%" }
                : false
            }
            transition={
              barMotionReady ? navBarTransition : { duration: 0 }
            }
          >
            <div className={cn(navClassName, "relative h-10 shrink-0")}>
              <NavLogo />
            </div>
            <div className={cn(navClassName, "relative h-10 shrink-0 pr-2")}>
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
          </motion.div>
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
