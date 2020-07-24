import React from 'react'

// Components
import Layout from '../components/layout'
import StudioHeader from '../components/molecules/studio-header/studio-header.component'

import '../components/particles/styles/global.styles.scss'

const Studio = () => {
  return (
    <Layout>
      <StudioHeader>
        <div className="header-text-center">
          <h1>Studio</h1>
          <p>Saglietti è uno studio di comunicazione specializzato in identità visiva, advertising, editoria ed exhibit design.</p>
        </div>
      </StudioHeader>
    </Layout>
  )
}

export default Studio;