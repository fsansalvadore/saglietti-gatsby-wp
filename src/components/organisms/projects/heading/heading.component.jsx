import React from 'react';
import parse from 'html-react-parser';
import Reveal from 'react-reveal/Reveal';
import styled from 'styled-components'

const HeadingStyled = styled.div`
    padding: 5rem 4rem;
    margin: 0 auto;
    max-width: 700px;
`

const Heading = ({name, originalContent}) => {
    
    console.log('From heading component:')
    console.log(name)

    return (
        <HeadingStyled>
            <Reveal effect="anim_enter">
                {parse(originalContent)}
            </Reveal>
        </HeadingStyled>
    )
}

export default Heading