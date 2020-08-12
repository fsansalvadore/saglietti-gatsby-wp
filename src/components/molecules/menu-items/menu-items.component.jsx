import React from 'react'
import { Link } from 'gatsby'
// import AniLink from "gatsby-plugin-transition-link/AniLink"

import styled from 'styled-components';

const NavLinks = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .menu-link {
    font-size: 4vw;
    margin: 2vh 6vw;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .menu-link {
      font-size: 8vw;
      margin: 6vh 2vw;
    }
  }
`

const MenuItems = () => {
  return (
    <NavLinks>
      <Link to="/studio" className="menu-link">Studio</Link>
      <Link to="/progetti" className="menu-link">Progetti</Link>
      <Link to="/contatti" className="menu-link">Contatti</Link>
    </NavLinks>
  )
}

export default MenuItems;