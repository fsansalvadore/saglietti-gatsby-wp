import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
// Components
import Layout from "../components/layout"

import "../components/particles/styles/global.styles.scss"
import StudioPage from "../components/particles/studio/studio-page.component"

const Studio = ({ data }) => (
  <Layout>
    <Helmet>
      <title>Studio • Saglietti</title>
    </Helmet>
    <StudioPage data={data} />
  </Layout>
)

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
      clients {
        nodes {
          id
          title
          featuredImage {
            node {
              link
            }
          }
        }
      }
    }
  }
`

export default Studio
