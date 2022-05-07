import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

// Components
import HeaderContainer from "../components/organisms/header-container/header-container.component"

import "../components/particles/styles/homepage.styles.scss"
import loadable from "@loadable/component"

const VideoSection = loadable(() =>
  import("../components/organisms/video-section/video-section.component")
)
const StudioCTA = loadable(() =>
  import("../components/molecules/studio-cta/studio-cta.component")
)
const ContactsCTA = loadable(() =>
  import("../components/molecules/contacts-cta/contacts-cta.component")
)
const SpotifyMarquee = loadable(() =>
  import("../components/molecules/SpotifyMarquee/SpotifyMarquee.component")
)

const IndexPage = () => {
  return (
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
}

export default IndexPage
