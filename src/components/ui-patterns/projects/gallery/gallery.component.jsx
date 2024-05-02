import React from "react"
import parse from "html-react-parser"
import styled from "styled-components"
import { Fade } from "react-awesome-reveal"

import "./gallery.style.scss"

const GalleryContainer = styled.div`
  padding: 0 4rem;
`

const Gallery = ({ originalContent }) => {
  return (
    <GalleryContainer>
      <Fade triggerOnce>{parse(originalContent)}</Fade>
    </GalleryContainer>
  )
}

export default Gallery
