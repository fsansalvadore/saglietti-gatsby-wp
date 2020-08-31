import React, { useState } from "react"
import { Link } from "gatsby"
// import AniLink from "gatsby-plugin-transition-link/AniLink"

import PropTypes from "prop-types"

import logo from '../../../images/Saglietti_logo.svg';
import Menu from '../menu-container/menu-container.component';

import styled from "styled-components";
import './nav.styles.scss';

const Navbar = styled.div`
  width: 100vw;
  height: 100px;
  position: fixed;
  z-index: 998;
  padding: 1.45rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
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

  &:hover {
    cursor: pointer;
  }

  span {
    position: absolute;
    width: 18px;
    height: 1px;
    background-color: #000;
    transition: transform 0.5s cubic-bezier(.9,0,0,0.9);
  }

  span:first-of-type {
    transform: ${ props => props.isOpen ? "translate3d(0, 0px, 0) rotate(45deg)" : "translate3d(0, -4px, 0) rotate(0deg)"};
  }

  span:last-of-type {
    transform: ${ props => props.isOpen ? "translate3d(0, 0px, 0) rotate(-45deg)" : "translate3d(0, 4px, 0) rotate(0deg)"};
  }
`

const Nav = () => {
  const [isOpen, toggleMenu] = useState(false)
  
  return (
    <>
      <Navbar>
        <Link to="/" style={{display: "flex", alignItems: "center"}}>
          <img src={logo} className="logo" alt="Saglietti"/>
        </Link>
        <MenuBtn onClick={() => toggleMenu(!isOpen)} isOpen={isOpen}>
          <span></span>
          <span></span>
        </MenuBtn>
      </Navbar>
      <Menu isOpen={isOpen}/>
    </>
  )
}

Nav.propTypes = {
  siteTitle: PropTypes.string,
}

Nav.defaultProps = {
  siteTitle: `Saglietti`,
}

export default Nav;