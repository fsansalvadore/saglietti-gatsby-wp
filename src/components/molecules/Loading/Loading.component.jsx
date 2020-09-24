import React from 'react'
import styled from 'styled-components'
import AnimatedLogo from '../../atoms/AnimatedLogo/AnimatedLogo.component'

const LoadingContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: ${props => props.isLoading ? "1" : "0"};
    transition: opacity 0.4s;
    z-index: 9995;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`

const Loading = ({isLoading}) => {
    return (
        <LoadingContainer isLoading={isLoading}>
            <AnimatedLogo />
        </LoadingContainer>
    )
}

export default Loading