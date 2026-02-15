import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../components/layout"
import "../../components/common/styles/global.styles.scss"
import ChiSiamoPage from "../../components/common/templates/chi-siamo"
import { useLanguage } from "../../contexts/LanguageContext"

const AboutEN = ({ data }) => {
  const { setLanguage } = useLanguage()

  // Set language to English when this page loads
  useEffect(() => {
    setLanguage("en")
  }, [setLanguage])

  const displayPage = data.wordpress.pageEN

  return (
    <Layout key="en">
      <Helmet>
        <title>About us • Saglietti</title>
      </Helmet>
      <ChiSiamoPage data={{ wordpress: { page: displayPage } }} />
    </Layout>
  )
}

export const query = graphql`
  query AboutQueryEN {
    wordpress {
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

export default AboutEN
