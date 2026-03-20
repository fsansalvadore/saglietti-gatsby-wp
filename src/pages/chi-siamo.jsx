import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import "../components/common/styles/global.styles.scss"
import ChiSiamoPage from "../components/common/templates/chi-siamo"
import { useLanguage } from "../contexts/LanguageContext"
import { useServicesByCategory } from "../hooks/useServicesByCategory"

const ChiSiamo = ({ data }) => {
  const { setLanguage } = useLanguage()

  // Set language to Italian when this page loads
  useEffect(() => {
    setLanguage("it")
  }, [setLanguage])

  const displayPage = data.wordpress.pageIT
  const services = useServicesByCategory(data.wordpress.services?.nodes, "IT")

  console.log("services", services)

  return (
    <Layout key="it">
      <Helmet>
        <title>Chi siamo • Saglietti</title>
      </Helmet>
      <ChiSiamoPage
        data={{
          wordpress: {
            page: displayPage,
          },
        }}
        services={services}
      />
    </Layout>
  )
}

export const query = graphql`
  query ChiSiamoQuery {
    wordpress {
      services(first: 50, where: { status: PUBLISH }) {
        nodes {
          categories {
            nodes {
              name
            }
          }
          title
          date
          language {
            code
          }
          servizi_acf {
            media {
              sourceUrl
            }
            mediaHover {
              mediaItemUrl
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
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
