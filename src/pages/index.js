import React from "react"
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
  </Layout>
)

export default IndexPage
