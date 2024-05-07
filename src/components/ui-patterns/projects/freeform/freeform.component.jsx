import React from "react"
import parse from "html-react-parser"
import { Fade } from "react-awesome-reveal"
import styled from "styled-components"

const FreeformStyled = styled.div`
  padding: 5rem 4rem;
  margin: 0 auto;
  max-width: 700px;

  p {
    font-size: 0.9rem;
    margin: 0 auto;
    max-width: 700px;
    line-height: 1.4rem;
    font-weight: 400;
    letter-spacing: 0;
  }
`

const Freeform = ({ name, originalContent }) => {
  return (
    <FreeformStyled>
      <Fade triggerOnce>{parse(originalContent)}</Fade>
    </FreeformStyled>
  )
}

export default Freeform
