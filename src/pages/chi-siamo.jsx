import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import "../components/common/styles/global.styles.scss"
import ChiSiamoPage from "../components/common/templates/chi-siamo"

const ChiSiamo = ({ data }) => (
  <Layout>
    <Helmet>
      <title>Chi siamo • Saglietti</title>
    </Helmet>
    <ChiSiamoPage data={data} />
  </Layout>
)

export const query = graphql`
  query ChiSiamoQuery {
    wordpress {
      page(id: "cG9zdDoxNzAx") {
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
