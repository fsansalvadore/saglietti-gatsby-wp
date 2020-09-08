import React from 'react';

// Components
import VerticalLine from '../../atoms/vertical-line.component'
import ProjectsCarousel from '../projects-carousel/projects-carousel.component';

import '../../particles/styles/global.styles.scss'
import HeaderLeft from './header-left.component';

const HeaderContainer = () => {
  return (
    <div className="header-container">
      <HeaderLeft />
      <VerticalLine style={{left: "60%"}} className="vertical_line"/>
      <ProjectsCarousel />
    </div>
  )
}

export default HeaderContainer;