import React from "react"
import { Link } from "gatsby"
import styled from "styled-components";
import './nav.styles.scss';
import AnimatedLogo from "../../atoms/AnimatedLogo/AnimatedLogo.component";

const NavLogoLink = styled(Link)`
  width: 100vw;
  height: 100px;
  position: fixed;
  z-index: 998;
  padding: 1.45rem 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  pointer-events: none;
  mix-blend-mode: difference;
  
  .logo_link {
    
  }

  @media screen and (min-width: 900px) {
    padding: 1.45rem 2rem;
  }
`

const NavLogo = () => {
  
  return (
      <NavLogoLink to="/" style={{display: "flex", alignItems: "center"}}>
        <div className="logo_link">
            <AnimatedLogo/>
        </div>
      </NavLogoLink>
  )
}

export default NavLogo;