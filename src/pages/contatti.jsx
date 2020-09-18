import React from 'react'
import { Helmet } from 'react-helmet'

// Components
import Layout from '../components/layout'
import VerticalLine from '../components/atoms/vertical-line.component'
import '../components/particles/styles/global.styles.scss'
import ContactsInfoContainer from '../components/organisms/contacts-info-container/contacts-info-container.component'
import Map from '../images/map_viaParma25.jpg'

const Contatti = () => (
    <Layout>
      <Helmet>
        <title>Contatti • Saglietti</title>
      </Helmet>
      <div className="header-container">
        <ContactsInfoContainer />
        <VerticalLine style={{left: "60%"}} className="vertical_line"/>
        <div className="header-right sticky">
          <div className="header-right-top" style={{backgroundImage: `url(${Map})`}}>
          </div>
          <div className="header-right-bottom">
            <p>
              via Parma 52<br/>
              10153 Torino Italia<br/>
            </p>
          </div>
          <div className="header-right-bottom">
            <p>
              <a href="tel:+393406450856">+39 340 645 0856</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )

export default Contatti;