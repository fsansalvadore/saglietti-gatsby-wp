import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { useLanguage } from "../contexts/LanguageContext"

import ProjectsList from "../components/ui-patterns/projects/projects-list/projects-list.component"

const Progetti = ({ data }) => {
  const { language } = useLanguage()

  return (
    <Layout className="!pt-0" initialTransparent>
      <Helmet>
        <title>{language === "it" ? "Progetti" : "Projects"} • Saglietti</title>
      </Helmet>
      <ProjectsList data={data} />
    </Layout>
  )
}

export const query = graphql`
  query ProgettiPageQuery {
    wordpress {
      projects(first: 200, where: { status: PUBLISH }) {
        nodes {
          id
          title
          date
          slug
          featuredImage {
            node {
              link
              uri
            }
          }
          custom_post_type_Project {
            ambiti
            anno
            visitabile
          }
        }
      }
    }
  }
`

export default Progetti
