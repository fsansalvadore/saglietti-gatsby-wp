import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
// Components
import Layout from "../components/layout"

import "../components/common/styles/global.styles.scss"
import StudioPage from "../components/common/studio/studio-page.component"

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
      clients(first: 100, where: { status: PUBLISH }) {
        nodes {
          id
          title
        }
      }
    }
  }
`

export default Studio
