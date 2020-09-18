import React from "react"
// import TransitionLink from 'gatsby-plugin-transition-link' 
import Layout from "../components/layout"
import { Helmet } from 'react-helmet'

// Components
import HeaderContainer from '../components/organisms/header-container/header-container.component'
import VideoSection from '../components/organisms/video-section/video-section.component';
import ContactsCTA from "../components/molecules/contacts-cta/contacts-cta.component";
import StudioCTA from '../components/molecules/studio-cta/studio-cta.component'
import SpotifyMarquee from '../components/molecules/SpotifyMarquee/SpotifyMarquee.component'

import '../components/particles/styles/homepage.styles.scss';

const IndexPage = () => (
  <Layout>
    <Helmet>
        <title>Saglietti • Branding — Digital • Home Page</title>
      </Helmet>
    <HeaderContainer />
    <VideoSection />
    <StudioCTA />
    <ContactsCTA />
    <SpotifyMarquee />
  </Layout>
)

export default IndexPage
