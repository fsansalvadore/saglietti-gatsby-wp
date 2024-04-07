import React from "react"
import parse from "html-react-parser"
import { Fade } from "react-awesome-reveal"
import styled from "styled-components"

const HeadingStyled = styled.div`
  padding: 5rem 4rem;
  margin: 0 auto;
  max-width: 700px;
`

const Heading = ({ name, originalContent }) => {
  return (
    <HeadingStyled>
      <Fade triggerOnce>{parse(originalContent)}</Fade>
    </HeadingStyled>
  )
}

export default Heading
