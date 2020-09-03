import React from 'react';
import { motion } from 'framer-motion';

// Components
import VerticalLine from '../../atoms/vertical-line.component'
import ProjectsCarousel from '../projects-carousel/projects-carousel.component';

import '../../particles/styles/global.styles.scss'
import HeaderLeft from './header-left.component';

const HeaderContainer = () => {
  return (
    <motion.div className="header-container" exit={{ opacity: 0 }}>
      <HeaderLeft />
      <VerticalLine style={{left: "60%"}}/>
      <ProjectsCarousel />
    </motion.div>
  )
}

export default HeaderContainer;