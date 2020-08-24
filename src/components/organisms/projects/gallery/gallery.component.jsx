import React from 'react'
import parse from 'html-react-parser'
import styled from 'styled-components'
import Reveal from 'react-reveal/Reveal';

import './gallery.style.scss'

const GalleryContainer = styled.div`
    padding: 0 4rem;
`

const Gallery = ({originalContent}) => {
    return(
        <GalleryContainer>
            <Reveal effect="anim_enter">
                {parse(originalContent)}
            </Reveal>
        </GalleryContainer>
    )
}

export default Gallery