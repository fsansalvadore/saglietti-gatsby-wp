import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import "../components/common/styles/global.styles.scss"
import ChiSiamoPage from "../components/common/templates/chi-siamo"
import { useLanguage } from "../contexts/LanguageContext"

const About = ({ data }) => {
  const { language } = useLanguage()

  // Select page based on current language
  const displayPage = language === "en" ? data.wordpress.pageEN : data.wordpress.pageIT

  return (
    <Layout key={language}>
      <Helmet>
        <title>{language === "it" ? "Chi siamo" : "About us"} • Saglietti</title>
      </Helmet>
      <ChiSiamoPage data={{ wordpress: { page: displayPage } }} />
    </Layout>
  )
}

export const query = graphql`
  query AboutQuery {
    wordpress {
      pageIT: page(id: "cG9zdDoxNzAx") {
        slug
        chisiamoacf {
          colonnaDestra
          colonnaFinaleDestra
          colonnaFinaleSinistra
          colonnaSinistra
          fieldGroupName
          testoIntroduttivo
          immagine1 {
            sourceUrl
          }
          immagine2 {
            sourceUrl
          }
        }
      }
      pageEN: page(id: "cG9zdDoxNzE5") {
        slug
        chisiamoacf {
          colonnaDestra
          colonnaFinaleDestra
          colonnaFinaleSinistra
          colonnaSinistra
          fieldGroupName
          testoIntroduttivo
          immagine1 {
            sourceUrl
          }
          immagine2 {
            sourceUrl
          }
        }
      }
    }
  }
`

export default About
