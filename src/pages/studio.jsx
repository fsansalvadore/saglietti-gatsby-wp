import React from 'react'

// Components
import Layout from '../components/layout'
import StudioHeader from '../components/molecules/studio-header/studio-header.component'
import TextRevealAnimation from '../components/particles/hooks/animationTextReveal'

import '../components/particles/styles/global.styles.scss'

const Studio = () => (
    <Layout>
      <StudioHeader>
        <div className="header-text-center">
          <h1>Studio</h1>
          <TextRevealAnimation>
            <p className="TextRevealItem">Saglietti è uno studio di comunicazione specializzato in identità visiva, advertising, editoria ed exhibit design.</p>
          </TextRevealAnimation>
        </div>
      </StudioHeader>
    </Layout>
  )

export default Studio;