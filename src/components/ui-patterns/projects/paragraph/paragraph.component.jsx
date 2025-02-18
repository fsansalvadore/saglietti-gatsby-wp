import React from "react"
import parse from "html-react-parser"
import { Fade } from "react-awesome-reveal"

import ParagraphStyled from "./paragraph.styled"

const Paragraph = ({ originalContent, ...props }) => {
  return (
    <ParagraphStyled {...props}>
      {/* <Fade triggerOnce>{parse(originalContent)}</Fade> */}
      {parse(originalContent)}
    </ParagraphStyled>
  )
}

export default Paragraph
