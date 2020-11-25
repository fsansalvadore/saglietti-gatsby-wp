import React, { useEffect } from "react"
import Layout from "../components/layout"
import { Helmet } from 'react-helmet'
import LocomotiveScroll from 'locomotive-scroll';
import "../components/particles/styles/locomotive-scroll.css"

// Components
import HeaderContainer from '../components/organisms/header-container/header-container.component'

import '../components/particles/styles/homepage.styles.scss';
import loadable from '@loadable/component'

const VideoSection = loadable(() => import('../components/organisms/video-section/video-section.component'))
const StudioCTA = loadable(() => import('../components/molecules/studio-cta/studio-cta.component'))
const ContactsCTA = loadable(() => import('../components/molecules/contacts-cta/contacts-cta.component'))
const SpotifyMarquee = loadable(() => import('../components/molecules/SpotifyMarquee/SpotifyMarquee.component'))

const IndexPage = () => {
  const scrollRef = React.createRef();
  useEffect(() => {
    if(typeof window !== `undefined` && StudioCTA) {
      const scroll = new LocomotiveScroll();
    }
  }, [scrollRef])

  return(
    <Layout data-scroll-container >
      <Helmet >
        <title>Saglietti • Branding — Digital • Home Page</title>
      </Helmet>
      <HeaderContainer data-scroll-section />
      <VideoSection data-scroll-section />
      <StudioCTA data-scroll-section />
      <ContactsCTA data-scroll-section />
      <SpotifyMarquee data-scroll-section />
    </Layout>
  )
}

export default IndexPage
