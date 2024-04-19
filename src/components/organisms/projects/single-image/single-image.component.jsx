import React from "react"
import styled from "styled-components"
import { Fade } from "react-awesome-reveal"

const StyledImageContainer = styled.figure`
  position: relative;
  width: 100%;
  display: block;
  padding: ${props =>
    props.size.includes("bordo") ? "1rem 4rem 0 4rem" : "0"};
  display: flex;
  flex-direction: column;
  align-items: ${props =>
    props.align.includes("center") ? "center" : "flex-start"};

  img,
  div {
    width: 100%;
  }
  figcaption {
    margin-top: 10px;
  }
`

const SingleImage = ({ attributes }) => {
  return (
    <StyledImageContainer
      size={attributes.className ? attributes.className : ""}
      align={attributes.align ? attributes.align : ""}
    >
      <Fade triggerOnce>
        <img src={attributes.url} alt={attributes.alt ? attributes.alt : ""} />
        {attributes.caption && attributes.caption.length > 0 && (
          <figcaption>{attributes.caption}</figcaption>
        )}
      </Fade>
    </StyledImageContainer>
  )
}

export default SingleImage
