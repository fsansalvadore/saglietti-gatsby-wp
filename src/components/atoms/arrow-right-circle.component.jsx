import React from 'react'
import ArrowRightSVG from '../../images/icons/arrow-right.svg'
import ArrowRightSVGWhite from '../../images/icons/arrow-right-white.svg'
import styled from 'styled-components'

const CircleSpan = styled.span`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid ${props => props.light ? '#fff' : '#000'};
    display: flex;
    align-items: center;
    justify-content: center;
`

const ArrowRightCircle = ({light}) => {
    return (
        <CircleSpan light={light}><img src={light ? ArrowRightSVGWhite : ArrowRightSVG} alt=""/></CircleSpan>
    )
}

export default ArrowRightCircle