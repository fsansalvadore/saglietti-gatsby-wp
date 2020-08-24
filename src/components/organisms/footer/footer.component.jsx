import React from 'react'
import styled from 'styled-components'
import  { Link } from 'gatsby'

import Logo from '../../../images/Saglietti_logo.svg'

const FooterComponent = styled.footer`
  width: 100%;
  padding: 70px 2rem;
  display: flex;
  border-top: 1px solid var(--line-color);

  .footer-logo {
    width: 33%;
  }

  .footer-info {
    width: 16.6%;
    font-size: 0.8rem;

    p {
      margin: 0 0 0.5rem 0;
    }
  }

  .footer-sitemap {
    width: 16.6%;

    li {
      list-style: none;
      font-size: 1rem;

      a {
        text-decoration: none;
      }
    }
  }
`

const Footer = () => {
  return (
    <FooterComponent>
      <div className="footer-logo">
        <img src={Logo} alt="Saglietti"/>
      </div>
      <div className="footer-info">
        <p>Copyright © {new Date().getFullYear()}</p>
        <p>P.I 03391740044</p>
        <p>info@saglietti.it</p>
      </div>
      <div className="footer-sitemap">
        <ul>
          <li><Link to="/studio">Studio</Link></li>
          <li><Link to="/progetti">Progetti</Link></li>
          <li><Link to="/contatti">Contatti</Link></li>
        </ul>
      </div>
    </FooterComponent>
  )
}

export default Footer