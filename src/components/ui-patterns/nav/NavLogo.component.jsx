import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import "./nav.styles.scss"
import AnimatedLogo from "../../ui/AnimatedLogo/AnimatedLogo.component"

const NavLogoLink = styled(Link)`
  /* height: 100px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  pointer-events: none;
`

const NavLogo = () => {
  return (
    <NavLogoLink to="/" style={{ display: "flex", alignItems: "center" }}>
      <div className="logo_link">
        <AnimatedLogo />
      </div>
    </NavLogoLink>
  )
}

export default NavLogo
