import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

// import '../components/particles/styles/projects.styles.scss'
import ProjectsList from '../components/organisms/projects/projects-list/projects-list.component'

const Progetti = ({data}) => (
    <Layout>
      <ProjectsList data={data}/>
    </Layout>
  )

export const query = graphql`
  query ProjectsQuery {
    wordpress {
      projects {
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
        }
      }
      extra_projects {
        nodes {
          featuredImage {
            node {
              link
            }
          }
          id
          date
          slug
          title
        }
      }
    }
  }
`

export default Progetti;