import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
// Components
import Layout from "../components/layout"
import { useLanguage } from "../contexts/LanguageContext"

import "../components/common/styles/global.styles.scss"
import StudioPage from "../components/common/studio/studio-page.component"

const Studio = ({ data }) => {
  const { language } = useLanguage()

  return (
    <Layout isInverted={true}>
      <Helmet>
        <title>{language === "it" ? "Studio" : "Studio"} • Saglietti</title>
      </Helmet>
      <StudioPage data={data} />
    </Layout>
  )
}

export const query = graphql`
  query StudioQuery {
    wordpress {
      pages {
        nodes {
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`

export default Studio
