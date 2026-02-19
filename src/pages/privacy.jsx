import React, { useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { useLanguage } from "../contexts/LanguageContext"

const PrivacyContainer = styled.div`
  padding: 200px 1rem;

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  @media (min-width: 900px) {
    padding: 200px 6rem 100px 40%;
  }
`

const PrivacyPage = ({ data }) => {
  const { setLanguage } = useLanguage()

  // Set language to Italian when this page loads
  useEffect(() => {
    setLanguage("it")
  }, [setLanguage])

  const displayPage = data.wordpress.page

  return (
    <Layout key="it">
      <Helmet>
        <title>Privacy • Saglietti</title>
      </Helmet>
      <PrivacyContainer>
        <h1
          dangerouslySetInnerHTML={{
            __html: displayPage?.title || "Privacy Policy",
          }}
        ></h1>
        <div
          dangerouslySetInnerHTML={{
            __html: displayPage?.content || "",
          }}
        ></div>
      </PrivacyContainer>
    </Layout>
  )
}

export const query = graphql`
  query PrivacyQuery {
    wordpress {
      page(id: "cG9zdDoz") {
        id
        title
        slug
        content
      }
    }
  }
`

export default PrivacyPage
