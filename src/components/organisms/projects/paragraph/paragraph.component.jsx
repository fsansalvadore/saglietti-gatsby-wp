import React from "react"
import parse from "html-react-parser"
import Reveal from "react-awesome-reveal"

import ParagraphStyled from "./paragraph.styled"

const Paragraph = ({ originalContent }) => {
  return (
    <ParagraphStyled>
      <Reveal effect="anim_enter">{parse(originalContent)}</Reveal>
    </ParagraphStyled>
  )
}

export default Paragraph
