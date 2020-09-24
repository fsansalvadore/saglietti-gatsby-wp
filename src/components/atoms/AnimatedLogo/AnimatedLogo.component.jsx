import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import logo from '../../../images/Saglietti_logo.svg';
import tag from '../../../images/Saglietti_logo_tag.svg';

const AnimatedLogoContainer = styled.div`
    position: relative;
    height: 20px;
    overflow: hidden;
    pointer-events: auto;

    .logo-anim {
        height: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        img {
            display: block;
        }
        .logo {
            height: 100%;

            &.last {
                margin-top: 20px;
            }
        }

        .tag {
            margin-top: 20px;
            height: 100%;
        }
    }
`

const AnimatedLogo = () => {
    return (
        <AnimatedLogoContainer>
            <motion.div
                className="logo-anim"
                animate={{ translateY: [0, 0, -40, -40, -80, -80] }}
                transition={{ repeat: Infinity, duration: 10, times: [0, 0.57, 0.58, 0.6, 0.61, 1], delay: 1 }}
                >
            <img src={logo} className="logo" alt="Saglietti"/>
            <img src={tag} className="tag" alt="Branding — Digital"/>
            <img src={logo} className="logo last" alt="Saglietti"/>
            </motion.div>
        </AnimatedLogoContainer>
    )
}

export default AnimatedLogo