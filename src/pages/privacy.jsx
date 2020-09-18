import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'

const PrivacyContainer = styled.div`
  margin: 200px 2rem;

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.3rem;
  }
  
  @media (min-width: 900px) {
    margin: 200px 6rem 100px 40%;
  }
`

const PrivacyPage = ({data}) => (
  <Layout>
    <Helmet>
        <title>Privacy • Saglietti</title>
      </Helmet>
    <PrivacyContainer >
      <h1 dangerouslySetInnerHTML={{__html: data.wordpress.pages.nodes.filter(page => page.slug === "privacy-policy")[0].title}}></h1>
      <div dangerouslySetInnerHTML={{__html: data.wordpress.pages.nodes.filter(page => page.slug === "privacy-policy")[0].content}}></div>
    </PrivacyContainer>
  </Layout>
)

export const query = graphql`
  query PrivacyQuery {
    wordpress {
      pages {
        nodes {
          id
          title
          date
          slug
          content
        }
      }
    }
  }
`

export default PrivacyPage;