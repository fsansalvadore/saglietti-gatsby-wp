import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'

// import '../components/particles/styles/projects.styles.scss'
import ProjectsList from '../components/organisms/projects/projects-list/projects-list.component'

const Progetti = ({data}) => (
    <Layout>
      <Helmet>
        <title>Progetti • Saglietti</title>
      </Helmet>
      <ProjectsList data={data}/>
    </Layout>
  )

export const query = graphql`
  query ProjectsQuery {
    wordpress {
      projects(first: 100, where: { status: PUBLISH }) {
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

export default Progetti;