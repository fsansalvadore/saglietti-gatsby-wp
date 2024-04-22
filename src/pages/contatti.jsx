import React from "react"
import { Helmet } from "react-helmet"

// Components
import Layout from "../components/layout"
import "../components/particles/styles/global.styles.scss"
import ContactsInfoContainer from "../components/organisms/contacts-info-container/contacts-info-container.component"

const Contatti = () => (
  <Layout hasTopBorder offsetFromTop>
    <Helmet>
      <title>Contatti • Saglietti</title>
    </Helmet>
    <div className="relative w-full h-full md:min-h-[calc(100vh-100px)] flex flex-col items-stretch lg:flex-row flex-1 header-container border-b border-black">
      <ContactsInfoContainer />
    </div>
  </Layout>
)

export default Contatti
