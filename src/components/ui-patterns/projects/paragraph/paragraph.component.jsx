import React from "react"
import parse from "html-react-parser"

import ParagraphStyled from "./paragraph.styled"

const Paragraph = ({ originalContent, ...props }) => {
  return <ParagraphStyled {...props}>{parse(originalContent)}</ParagraphStyled>
}

export default Paragraph
