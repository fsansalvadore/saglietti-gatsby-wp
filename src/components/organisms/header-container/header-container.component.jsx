import React from 'react';

// Components
import VerticalLine from '../../atoms/vertical-line.component'
import ProjectsCarousel from '../projects-carousel/projects-carousel.component';

import '../../particles/styles/global.styles.scss'
import HeaderLeft from './header-left.component';
import styled from 'styled-components'
import ScrollDownIcon from '../../atoms/scroll-down-icon.component';

const ScrollIconContainer = styled.div`
  position: absolute;
  height: 190vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 10;

  .scroll-icon-sticky {
    width: 100%;
    height: 95vh;
    height: ${props => `calc(${props.vh}) * 95`};
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;

    .scroll-icon {
      position: absolute;
      bottom: 3rem;
    }
  }

  @media (min-width: 900px) {
    width: 60vw;
  }
`

const HeaderContainer = () => {
  let vh = null
  if(typeof window !== `undefined`) {
    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01
    });
  }

  return (
    <div className="header-container">
      <ScrollIconContainer vh={vh}>
        <div className="scroll-icon-sticky">
          <ScrollDownIcon />
        </div>
      </ScrollIconContainer>
      <HeaderLeft />
      <VerticalLine style={{left: "60%"}} className="vertical_line"/>
      <ProjectsCarousel />
    </div>
  )
}

export default HeaderContainer;