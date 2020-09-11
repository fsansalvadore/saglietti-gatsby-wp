import React from 'react'
import { graphql } from 'gatsby'

// Components
import Layout from '../components/layout'
import StudioHeader from '../components/molecules/studio-header/studio-header.component'
import TextRevealAnimation from '../components/particles/hooks/animationTextReveal'

import '../components/particles/styles/global.styles.scss'
import StudioPage from '../components/particles/studio/studio-page.component'

const Studio = ({data}) => (
    <Layout>
      <StudioHeader>
        <div className="header-text-center">
          <h1>Studio</h1>
          <TextRevealAnimation>
            <p className="TextRevealItem">Saglietti è uno studio di comunicazione specializzato in identità visiva, advertising, editoria ed exhibit design.</p>
          </TextRevealAnimation>
        </div>
      </StudioHeader>
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