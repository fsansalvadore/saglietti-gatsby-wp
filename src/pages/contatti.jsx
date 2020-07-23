import React from 'react'

// Components
import Layout from '../components/layout'
import VerticalLine from '../components/atoms/vertical-line.component'
import '../components/particles/styles/global.styles.scss'
import ContactsInfoContainer from '../components/organisms/contacts-info-container/contacts-info-container.component'

import Map from '../images/map_viaParma25.jpg'

const Contatti = () => {
  return (
    <Layout>
      <div className="header-container">
        <ContactsInfoContainer />
        <VerticalLine initial={{x: "40vw"}} animate={{ x: 0 }} transition={{ duration: 0.8 }} style={{left: "60%"}} />
        <div className="header-right sticky">
          <div className="header-right-top" style={{backgroundImage: `url(${Map})`}}>

          </div>
          <div className="header-right-bottom">
            <p>
              via Parma 52<br/>
              10153 Torino Italia
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contatti;