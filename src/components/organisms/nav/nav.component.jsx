import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Menu from "../menu-container/menu-container.component"
import styled from "styled-components"
import "./nav.styles.scss"
// import AnimatedLogo from "../../atoms/AnimatedLogo/AnimatedLogo.component";ù
import NavLogo from "./NavLogo.component"
import { isBrowser } from "framer-motion"

const Navbar = styled.div`
  width: 100vw;
  height: 100px;
  top: 0;
  position: fixed;
  z-index: 998;
  padding: 1.45rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;

  @media screen and (min-width: 900px) {
    padding: 1.45rem 2rem;
  }
`

const MenuBtn = styled.a`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  pointer: cursor;
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

const Nav = () => {
  const ref = useRef(null)
  const [isOpen, toggleMenu] = useState(false)

  // useEffect(() => {
  //   if (!isBrowser) return
  //   const handleScroll = e => {
  //     const body = document.querySelector("body")
  //     console.log("scroll event", e)
  //     console.log("scroll", window?.scrollX)
  //   }

  //   window.addEventListener("scroll", handleScroll)

  //   return () => window.removeEventListener("scroll", () => null)
  // }, [])

  return (
    <>
      <Navbar ref={ref}>
        <NavLogo />
        <MenuBtn onClick={() => toggleMenu(!isOpen)} isOpen={isOpen}>
          <span></span>
          <span></span>
        </MenuBtn>
      </Navbar>
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
