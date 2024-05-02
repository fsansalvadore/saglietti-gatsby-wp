import React from "react"
import styled from "styled-components"
import Reveal from "react-awesome-reveal"

const StyledVideoContainer = styled.figure`
  position: relative;
  width: 100%;
  display: block;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
  }
  figcaption {
    margin-top: 10px;
  }

  video {
    display: block;
    width: 100%;
  }
`

const VideoBlock = ({ attributes }) => {
  return (
    <StyledVideoContainer
      size={attributes.className ? attributes.className : ""}
      align={attributes.align ? attributes.align : ""}
    >
      <Reveal effect="anim_enter">
        <video
          width="900"
          playsInline={attributes.playsInline}
          muted={attributes.muted}
          loop={attributes.loop}
          poster={attributes.poster}
          controls={attributes.controls}
          autoplay={attributes.autoplay}
        >
          <source src={attributes.src} type="video/mp4" />
          <track src={attributes.caption} kind="subtitles" srcLang="no" />
          Your browser does not support HTML video.
        </video>
      </Reveal>
    </StyledVideoContainer>
  )
}

export default VideoBlock
