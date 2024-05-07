import "./nav.styles.scss"
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Menu from "../menu-container/menu-container.component"
import styled from "styled-components"
import { Link } from "gatsby"
import NavLogo from "./NavLogo.component"
import { isBrowser } from "framer-motion"
import classNames from "classnames"
import { useLockBodyScroll, useWindowSize } from "react-use"

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
  const [isChip, setIsChip] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    if (!isBrowser) return
    const doc = document.documentElement

    const handleScroll = e => {
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      setIsChip(top > 20)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useLockBodyScroll(isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [width])

  return (
    <>
      <nav className="fixed z-[998] px-4 top-0 flex justify-center w-full h-[100px] items-center">
        <div
          className={classNames(
            "flex items-center bg-white/90 backdrop-blur-lg border py-2 px-4 justify-between w-screen mx-auto rounded-full !transition-all !duration-300 will-change-transform",
            isChip && !isOpen
              ? "bg-white/90 w-[90vw] max-w-[900px] shadow-sm border-gray-100"
              : classNames(
                  "max-w-full shadow-none border-transparent",
                  initialTransparent && "!backdrop-blur-0 !bg-transparent",
                ),
          )}
        >
          <NavLogo />
          <MenuBtn
            className="md:!hidden"
            onClick={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
          >
            <span></span>
            <span></span>
          </MenuBtn>
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link to="/studio" className="p-1">
              Studio
            </Link>
            <Link to="/progetti" className="p-1">
              Progetti
            </Link>
            <Link
              href="mailto:info@saglietti.it"
              className="p-1 hover:underline transition-all"
            >
              Contatti
            </Link>
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
