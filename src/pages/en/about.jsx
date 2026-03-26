import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../../components/layout"
import "../../components/common/styles/global.styles.scss"
import ChiSiamoPage from "../../components/common/templates/chi-siamo"
import { useLanguage } from "../../contexts/LanguageContext"
import { useServicesByCategory } from "../../hooks/useServicesByCategory"

const AboutEN = ({ data }) => {
  const { setLanguage } = useLanguage()

  // Set language to English when this page loads
  useEffect(() => {
    setLanguage("en")
  }, [setLanguage])

  const displayPage = data.wordpress.pageEN
  const services = useServicesByCategory(data.wordpress.services?.nodes, "EN")

  return (
    <Layout key="en">
      <Helmet>
        <title>About us • Saglietti</title>
      </Helmet>
      <ChiSiamoPage
        data={{ wordpress: { page: displayPage } }}
        services={services}
      />
    </Layout>
  )
}

export const query = graphql`
  query AboutQueryEN {
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
            img {
              sourceUrl
            }
            imgHover {
              mediaItemUrl
            }
          }
          immagine2 {
            img {
              sourceUrl
            }
            imgHover {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`

export default AboutEN
