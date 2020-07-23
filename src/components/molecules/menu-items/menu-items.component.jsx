import React from 'react'
import { Link } from 'gatsby'
import AniLink from "gatsby-plugin-transition-link/AniLink"

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
      <AniLink to="/studio" className="menu-link">Studio</AniLink>
      <AniLink to="/progetti" className="menu-link">Progetti</AniLink>
      <AniLink to="/contatti" className="menu-link">Contatti</AniLink>
    </NavLinks>
  )
}

export default MenuItems;