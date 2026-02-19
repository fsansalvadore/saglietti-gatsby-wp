import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import "./nav.styles.scss"
// import AnimatedLogo from "../../ui/AnimatedLogo/AnimatedLogo.component"

const NavLogoLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const NavLogo = () => {
  return (
    <NavLogoLink to="/" style={{ display: "flex", alignItems: "center" }}>
      <div className="logo_link">
        Saglietti. Branding + Digital
        {/* <AnimatedLogo /> */}
      </div>
    </NavLogoLink>
  )
}

export default NavLogo
