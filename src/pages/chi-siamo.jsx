import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import "../components/common/styles/global.styles.scss"
import ChiSiamoPage from "../components/common/templates/chi-siamo"
import { useLanguage } from "../contexts/LanguageContext"

const ChiSiamo = ({ data }) => {
  const { setLanguage } = useLanguage()

  // Set language to Italian when this page loads
  useEffect(() => {
    setLanguage("it")
  }, [setLanguage])

  const displayPage = data.wordpress.pageIT

  return (
    <Layout key="it">
      <Helmet>
        <title>Chi siamo • Saglietti</title>
      </Helmet>
      <ChiSiamoPage data={{ wordpress: { page: displayPage } }} />
    </Layout>
  )
}

export const query = graphql`
  query ChiSiamoQuery {
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

export default ChiSiamo
