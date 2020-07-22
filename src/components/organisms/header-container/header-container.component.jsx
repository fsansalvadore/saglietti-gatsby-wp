import React from 'react';
import { motion } from 'framer-motion';

// Components
import VerticalLine from '../../atoms/vertical-line.component'
import ProjectsCarousel from '../projects-carousel/projects-carousel.component';

import './header-container.styles.scss'
import HeaderLeft from './header-left.component';

const HeaderContainer = () => {
  return (
    <motion.div className="header-container" exit={{ opacity: 0 }}>
      <HeaderLeft />
      <VerticalLine initial={{x: "-60vw"}} animate={{ x: 0 }} transition={{ duration: 0.8 }} style={{left: "60%"}}/>
      <ProjectsCarousel />
    </motion.div>
  )
}

export default HeaderContainer;