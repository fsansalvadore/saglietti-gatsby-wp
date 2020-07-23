import React, { useState } from "react"
import { Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import PropTypes from "prop-types"

import logo from '../../../images/Saglietti_logo.svg';
import Menu from '../menu-container/menu-container.component';

import styled from "styled-components";
import './nav.styles.scss';

const Navbar = styled.div`
  width: 100vw;
  height: 100px;
  position: fixed;
  z-index: 999;
  padding: 1.45rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
`

const MenuBtn = styled.div`
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
  }

  span:first-of-type {
    transform: translate3d(0, -4px, 0);
  }

  span:last-of-type {
    transform: translate3d(0, 4px, 0);
  }
`

const Nav = () => {
  const [isOpen, toggleMenu] = useState(false)
  
  return (
    <>
      <Navbar>
        <AniLink fade to="/" style={{display: "flex", alignItems: "center"}}>
          <img src={logo} className="logo" alt="Saglietti"/>
        </AniLink>
        <MenuBtn onClick={() => toggleMenu(!isOpen)}>
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