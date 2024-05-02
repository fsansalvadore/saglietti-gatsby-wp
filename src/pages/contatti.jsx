import React from "react"
import { Helmet } from "react-helmet"

// Components
import Layout from "../components/layout"
import "../components/common/styles/global.styles.scss"
import ContactsInfoContainer from "../components/ui-patterns/contacts-info-container/contacts-info-container.component"

const Contatti = () => (
  <Layout hasTopBorder offsetFromTop>
    <Helmet>
      <title>Contatti • Saglietti</title>
    </Helmet>
    <div className="relative w-full h-full md:min-h-[calc(100vh-100px)] flex flex-col items-stretch lg:flex-row flex-1 header-container">
      <ContactsInfoContainer />
    </div>
  </Layout>
)

export default Contatti
