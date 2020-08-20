import React from "react"
import { graphql, Link } from "gatsby"
// import TransitionLink from 'gatsby-plugin-transition-link' 
import Layout from "../components/layout"

// Components
import HeaderContainer from '../components/organisms/header-container/header-container.component'
import VideoSection from '../components/organisms/video-section/video-section.component';
import ContactsCTA from "../components/molecules/contacts-cta/contacts-cta.component";

import '../components/particles/styles/homepage.styles.scss';

const IndexPage = ({data}) => (
  <Layout>    
    <HeaderContainer />
    <VideoSection />
    <ContactsCTA />
    <ul>
      {data.wordpress.projects.nodes.map(project => (
        <li><Link key={project.id} to={`/progetti/${project.slug}`}>{project.date} - {project.slug}</Link></li>
      ))}
    </ul>
  </Layout>
)

export const query = graphql`
  query MyQuery {
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

export default IndexPage
