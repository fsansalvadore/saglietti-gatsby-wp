import React from 'react'

import Layout from '../components/layout'

const Progetti = ({data}) => {
  console.log(data)
  return (
    <Layout>
      <ul>
        {
          data.wordpress.projects.nodes.map(proj => (
            <li>{proj.title}</li>
          ))
        }
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsQuery {
    wordpress {
      projects {
        nodes {
          id
          title
          date
          slug
        }
      }
    }
  }
`

export default Progetti;