import React from 'react'
import { graphql } from 'gatsby'

// Components
import Layout from '../components/layout'

import '../components/particles/styles/global.styles.scss'
import StudioPage from '../components/particles/studio/studio-page.component'

const Studio = ({data}) => (
    <Layout>
      <StudioPage data={data}/>
    </Layout>
  )

export const query = graphql`
  query StudioQuery {
    wordpress {
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

export default Studio;