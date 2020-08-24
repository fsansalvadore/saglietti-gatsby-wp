import React from 'react'
import styled from 'styled-components'
import Reveal from 'react-reveal/Reveal';

const StyledImageContainer = styled.figure`
    position: relative;
    width: 100%;
    display: block;
    padding: ${props => props.size.includes('bordo') ? '1rem 4rem 0 4rem' : '0'};
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
            <Reveal effect="anim_enter">
            <img src={attributes.url} alt={attributes.title}/>
            {
                attributes.caption && attributes.caption.length > 0 &&
                <figcaption>{attributes.caption}</figcaption>
            }
            </Reveal>
        </StyledImageContainer>
    )
}

export default SingleImage