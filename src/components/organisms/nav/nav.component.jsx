import React, { useState } from "react"
import { Link } from "gatsby"
// import AniLink from "gatsby-plugin-transition-link/AniLink"
import {motion} from 'framer-motion'

import PropTypes from "prop-types"

import logo from '../../../images/Saglietti_logo.svg';
import tag from '../../../images/Saglietti_logo_tag.svg';
import Menu from '../menu-container/menu-container.component';

import styled from "styled-components";
import './nav.styles.scss';

const Navbar = styled.div`
  width: 100vw;
  height: 100px;
  position: fixed;
  z-index: 998;
  padding: 1.45rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  
  .logo_link {
    position: relative;
    height: 20px;
    overflow: hidden;
    pointer-events: auto;

    .logo_inner {
      height: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      img {
        display: block;
      }
      .logo {
        height: 100%;

        &.last {
          margin-top: 20px;
        }
      }
  
      .tag {
        margin-top: 20px;
        height: 100%;
      }
    }
  }

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
        <Link className="logo_link" to="/" style={{display: "flex", alignItems: "center"}}>
          <motion.div
            className="logo_inner"
            animate={{ translateY: [0, 0, -40, -40, -80, -80] }}
            transition={{ repeat: Infinity, duration: 10, times: [0, 0.57, 0.58, 0.6, 0.61, 1], delay: 1 }}
                >
            <img src={logo} className="logo" alt="Saglietti"/>
            <img src={tag} className="tag" alt="Branding — Digital"/>
            <img src={logo} className="logo last" alt="Saglietti"/>
          </motion.div>
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