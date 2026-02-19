import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import MailchimpForm from "../../MailchimpForm"
import SagliettiLogo from "../../SagliettiLogo"
import { useTranslation } from "../../../hooks/useTranslation"
import { useLanguage } from "../../../contexts/LanguageContext"

const FooterComponent = styled.footer`
  width: 100%;
  padding: 1rem;
  color: ${({ isInverted }) => (isInverted ? "#fff" : "#000")};
  input,
  input::placeholder {
    color: ${({ isInverted }) => (isInverted ? "#fff" : "#000")};
  }
  svg path {
    fill: ${({ isInverted }) => (isInverted ? "#fff" : "#000")};
  }

  @media only screen and (min-width: 640px) {
    padding: 70px 2rem;

    div {
      margin: 0;
    }
  }
`

const Footer = ({ isInverted }) => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const privacyPath = language === "en" ? "/en/privacy" : "/privacy"
  
  return (
    <FooterComponent
      isInverted={isInverted}
      className="w-full flex flex-col gap-28 pb-28"
    >
      <div className="flex flex-col font-medium md:flex-row gap-8 w-full [&_p]:!leading-6 [&_a]:!leading-6">
        <div className="flex flex-col gap-2 flex-1 text-center">
          <a href="mailto:info@saglietti.it" className="underline">
            info@saglietti.it
          </a>
          <p className="">VAT 03391740044</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 text-center">
          <p>IT 10153 Torino TO</p>
          <p>Via Reggio 13</p>
        </div>
        <div className="flex flex-col gap-2 flex-1 text-center">
          <div>
            <a
              href="https://www.instagram.com/saglietti.studio/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Instagram
            </a>{" "}
            +{" "}
            <a
              href="https://www.linkedin.com/company/alessandro-saglietti-communication-design/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Linkedin
            </a>
          </div>
          <MailchimpForm isInverted={isInverted} />
        </div>
        <div className="flex flex-col gap-2 flex-1 text-center">
          <p className="m-0 uppercase">
            {t("footer.copyright")} © {new Date().getFullYear()}
          </p>
          <Link to={privacyPath}>{t("footer.privacyPolicy")}</Link>
        </div>
      </div>
      <SagliettiLogo />
    </FooterComponent>
  )
}

export default Footer
