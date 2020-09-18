import React from 'react';
import styled from 'styled-components'
import { motion } from 'framer-motion';

const IconOuter = styled.div`
    position: relative;
    width: 22px;
    height: 37px;
    border: 1px solid #000;
    border-radius: 20px;
    background-color: #fff;
    opacity: 0;
    animation-name: fadeIn;
    animation-fill-mode: forwards;
    animation-duration: 1.4s;
    animation-timing-function: ease;
    animation-delay: 0.1s;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.2);
    
    span {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        bottom: 10px;
        width: 2px;
        height: 2px;
        background-color: #000;
        border-radius: 50%;
    }
`

const ScrollDownIcon = () => {
    return (
        <IconOuter className="scroll-icon">
            <motion.span
                animate={{ translateY: [6, 0, 0, -15], opacity: [0, 1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.7, times: [0, 0.025, 0.5, 1] }}
            />
        </IconOuter>
    );
};

export default ScrollDownIcon;