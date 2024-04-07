import React from "react"
import parse from "html-react-parser"
import { Fade } from "react-awesome-reveal"

import ParagraphStyled from "./paragraph.styled"

const Paragraph = ({ originalContent }) => {
  return (
    <ParagraphStyled>
      <Fade triggerOnce>{parse(originalContent)}</Fade>
    </ParagraphStyled>
  )
}

export default Paragraph
