import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Logo from "../../../images/Saglietti_logo.svg"
import SocialIcons from "../SocialIcons/SocialIcons.component"
import MailchimpForm from "../../MailchimpForm"

const FooterComponent = styled.footer`
  width: 100%;
  padding: 1rem;

  .footer-info {
    font-size: 0.8rem;

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

  .footer-sitemap {
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

    div {
      margin: 0;
    }
  }
`

const Footer = () => {
  return (
    <FooterComponent className="flex flex-col gap-4 sm:!grid grid-cols-2 md:grid-cols-3">
      <div className="h-full w-full flex flex-col gap-2 justify-between items-start">
        <img src={Logo} alt="Saglietti" className="h-[30px] w-auto" />
        <p className="!m-0">branding + digital</p>
      </div>
      <div className="footer-info">
        <p>
          IT 10153 Torino TO
          <br />
          Corso Regio Parco 36A
          <br />T <a href="tel:00393406450856">+39 340 645 0856</a>
        </p>
        <p className="m-0 !mt-4 md:!mt-8 uppercase">VAT 03391740044</p>
        <p className="m-0 uppercase">Copyright © {new Date().getFullYear()}</p>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-2 sm:col-start-2 md:col-start-3">
        <MailchimpForm />
        <SocialIcons />
      </div>
    </FooterComponent>
  )
}

export default Footer
