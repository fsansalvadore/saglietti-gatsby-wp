import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { useLanguage } from "../contexts/LanguageContext"

import ProjectsList from "../components/ui-patterns/projects/projects-list/projects-list.component"

const Progetti = ({ data }) => {
  const { setLanguage } = useLanguage()

  // Set language to Italian when this page loads
  useEffect(() => {
    setLanguage("it")
  }, [setLanguage])

  // Filter projects to show only Italian ones
  const filteredProjects = data.wordpress.projects.nodes.filter(
    project => (project.language?.slug || "it") === "it",
  )

  return (
    <Layout className="!pt-0" initialTransparent key="it">
      <Helmet>
        <title>Progetti • Saglietti</title>
      </Helmet>
      <ProjectsList
        data={{
          ...data,
          wordpress: {
            ...data.wordpress,
            projects: {
              nodes: filteredProjects,
            },
          },
        }}
      />
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
          language {
            slug
            name
          }
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
            cliente
          }
        }
      }
    }
  }
`

export default Progetti
