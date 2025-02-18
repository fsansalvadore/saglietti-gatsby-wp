import React from "react"
import styled from "styled-components"

const StyledVideoContainer = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
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
    height: 100vh;
  }
`

const VideoBlock = ({ attributes, ...props }) => {
  return (
    <StyledVideoContainer
      size={attributes.className ? attributes.className : ""}
      align={attributes.align ? attributes.align : ""}
      {...props}
    >
      {/* <Reveal effect="anim_enter"> */}
      <video
        width="900"
        playsInline={attributes.playsInline}
        muted={attributes.muted}
        loop={attributes.loop}
        poster={attributes.poster}
        controls={true}
        autoplay={true}
        className="w-full h-screen object-cover"
      >
        <source src={attributes.src} type="video/mp4" />
        <track src={attributes.caption} kind="subtitles" srcLang="no" />
        Your browser does not support HTML video.
      </video>
      {/* </Reveal> */}
    </StyledVideoContainer>
  )
}

export default VideoBlock
