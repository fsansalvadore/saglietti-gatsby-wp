import React from "react"
import { Helmet } from "react-helmet"

// Components
import Layout from "../components/layout"
import VerticalLine from "../components/atoms/vertical-line.component"
import "../components/particles/styles/global.styles.scss"
import ContactsInfoContainer from "../components/organisms/contacts-info-container/contacts-info-container.component"
import ContactForm from "../components/organisms/contact-form/contact-form.component"

const Contatti = () => (
  <Layout>
    <Helmet>
      <title>Contatti • Saglietti</title>
    </Helmet>
    <div className="relative h-full flex flex-col items-stretch lg:flex-row flex-1 header-container mt-[100px] border-t border-b border-black">
      <ContactsInfoContainer />
      <div className="header-right sticky">
        <ContactForm />
      </div>
    </div>
  </Layout>
)

export default Contatti
