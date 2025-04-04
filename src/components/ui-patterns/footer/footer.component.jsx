import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import SocialIcons from "../SocialIcons/SocialIcons.component"
import MailchimpForm from "../../MailchimpForm"
import SagliettiLogo from "../../SagliettiLogo"

const FooterComponent = styled.footer`
  width: 100%;
  padding: 1rem;
  filter: ${props => (props.isInverted ? "invert()" : "none")};

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

  @media only screen and (min-width: 640px) {
    padding: 70px 2rem;

    div {
      margin: 0;
    }
  }
`

const Footer = ({ isInverted }) => {
  return (
    <FooterComponent
      isInverted={isInverted}
      className="flex flex-col gap-4 sm:!grid grid-cols-2 md:grid-cols-3"
    >
      <div className="h-full w-full flex flex-col gap-2 justify-between items-start">
        <SagliettiLogo />
        <p className="!m-0">branding + digital</p>
      </div>
      <div className="footer-info">
        <p>
          IT 10153 Torino TO
          <br />
          Via Reggio 13
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
