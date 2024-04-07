import React from "react"
import styled from "styled-components"
import MenuItems from "../../molecules/menu-items/menu-items.component"
import SocialIcons from "../../molecules/SocialIcons/SocialIcons.component"
import { Link } from "gatsby"

const MenuContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 990;
  font-weight: 300;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  transition: opacity 0.5s cubic-bezier(0.42, 0.05, 0.2, 0.98);
  backdrop-filter: ${({ isOpen }) => (isOpen ? "blur(6px)" : "blur(0)")};
  -webkit-backdrop-filter: ${({ isOpen }) =>
    isOpen ? "blur(6px)" : "blur(0)"};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 900px) {
    flex-direction: row;
    align-items: center;
  }
`

const MenuInfo = styled.div`
  position: relative;
  width: 80%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 0.9rem;
    line-height: 160%;
    margin: 0;
  }

  .privacy-link a {
    font-size: 0.8rem;
  }

  .no-mobile {
    display: none;
  }

  @media (min-width: 900px) {
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
    margin: 2rem auto;
    text-align: left;

    .no-mobile {
      display: block;
    }
  }
`

const Menu = ({ isOpen }) => {
  return (
    <MenuContainer isOpen={isOpen} classname="menu-container">
      <MenuItems isOpen={isOpen}></MenuItems>
      <MenuInfo>
        <div className="privacy-link no-mobile">
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div>
          <p>
            Saglietti. Branding — Digital
            <br />
            IT 10153 Torino TO
            <br />
            Corso Regio Parco 36C
            <br />
            <a
              href="https://www.google.com/maps/place/Saglietti+-+Studio+di+comunicazione+in+Torino/@45.0749314,7.6876913,16z/data=!4m5!3m4!1s0x47886d307559cf33:0xd92845c3e894e287!8m2!3d45.0758792!4d7.695027"
              target="_blank"
              rel="noreferrer"
            >
              Mappa
            </a>
          </p>
        </div>
        <div className="no-mobile">
          <p>
            <a href="mailto:info@saglietti.it">info@saglietti.it</a>
            <br />
            VAT 03391740044
            <br />
            Copyright © {new Date().getFullYear()} Saglietti
          </p>
        </div>
        <div>
          <SocialIcons />
        </div>
      </MenuInfo>
    </MenuContainer>
  )
}

export default Menu
