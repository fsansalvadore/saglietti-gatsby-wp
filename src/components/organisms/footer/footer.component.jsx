import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Logo from "../../../images/Saglietti_logo.svg"
import SocialIcons from "../../molecules/SocialIcons/SocialIcons.component"

const FooterComponent = styled.footer`
  width: 100%;
  padding: 50px 1rem;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line-color);
  text-align: center;
  align-items: center;

  .footer-logo {
    width: 25%;
  }

  div {
    margin: 20px 0;
  }

  .footer-info {
    width: 100%;
    font-size: 0.8rem;

    p {
      margin: 0 0 0.5rem 0;
    }

    ul {
      margin: 0;
    }
    li {
      list-style: none;

      a {
        text-decoration: none !important;

        &:hover {
          text-decoration: underline !important;
        }
      }
    }
  }
  .flex-end {
    display: flex;
    justify-content: center;
  }

  .footer-sitemap {
    width: 100%;

    ul {
      margin: 0;
    }

    li {
      list-style: none;
      font-size: 1rem;

      a {
        text-decoration: none;

        &:hover {
          text-decoration: underline !important;
        }
      }
    }
  }

  @media only screen and (min-width: 900px) {
    padding: 70px 2rem;
    flex-direction: row;
    text-align: left;
    align-items: flex-start;

    div {
      margin: 0;
    }

    .footer-sitemap,
    .footer-info {
      width: 16.6%;

      &.large {
        width: 24%;
      }
    }

    .flex-end {
      justify-content: flex-end;
    }
  }
`

const Footer = () => {
  return (
    <FooterComponent>
      <div className="footer-logo">
        <img src={Logo} alt="Saglietti" />
      </div>
      <div className="footer-info large">
        <p>Copyright © {new Date().getFullYear()}</p>
        <p>P.I 03391740044</p>
        <p>
          <a href="mailto:info@saglietti.it">info@saglietti.it</a>
        </p>
        <p>
          <a href="tel:+393406450856">+39 340 645 0856</a>
        </p>
      </div>
      <div className="footer-sitemap">
        <ul>
          <li>
            <Link to="/studio">Studio</Link>
          </li>
          <li>
            <Link to="/progetti">Progetti</Link>
          </li>
          <li>
            <Link to="/contatti">Contatti</Link>
          </li>
        </ul>
      </div>
      <div className="footer-info">
        <ul>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <div className="footer-info flex-end">
        <SocialIcons />
      </div>
    </FooterComponent>
  )
}

export default Footer
