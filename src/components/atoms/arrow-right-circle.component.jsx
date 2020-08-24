import React from 'react'
import ArrowRightSVG from '../../images/icons/arrow-right.svg'
import styled from 'styled-components'

const CircleSpan = styled.span`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ArrowRightCircle = () => {
    return (
        <CircleSpan><img src={ArrowRightSVG} alt=""/></CircleSpan>
    )
}

export default ArrowRightCircle