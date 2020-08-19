import React from 'react'
import styled from 'styled-components'

const StyledImageContainer = styled.figure`
    position: relative;
    width: 100%;
    display: block;
    padding: ${props => props.size.includes('full') ? '1rem 4rem' : '0'};
    display: flex;
    flex-direction: column;
    align-items: ${props => props.align.includes('center') ? 'center' : 'flex-start'};

    img {
        width: 100%;
    }
    figcaption {
        margin-top: 10px;
    }
    
`

const SingleImage = ({ attributes }) => {
    
    // console.log('attributes:')
    // console.log(attributes)

    return (
        <StyledImageContainer size={attributes.className ? attributes.className : ''} align={attributes.align ? attributes.align : ''}>
            <img src={attributes.url} alt={attributes.title}/>
            <figcaption>{attributes.title}</figcaption>
        </StyledImageContainer>
    )
}

export default SingleImage