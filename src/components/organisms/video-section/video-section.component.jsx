import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'

import { gsap } from "gsap";
import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { TweenMax, TweenLite, TimelineLite } from "gsap/all";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import CustomEase from '../../particles/vendor/gsap/CustomEase'
import TextRevealAnimation from '../../particles/hooks/animationTextReveal'
import Showreel from '../../../assets/SAGLIETTI_Showreel.mp4'

import '../../particles/styles/homepage.styles.scss';

if(typeof window !== `undefined`) {
  gsap.registerPlugin(CSSRulePlugin, CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineLite, TweenLite)
}
const VideoSectionStyled = styled.div`
  .video-container {
    will-change: transform;
    -webkit-backface-visibility: hidden;
  }
`

const VideoSection = () => {
  const videoRef = useRef(null)
  
  useEffect(() => {
    // gsap
    if(typeof window !== `undefined`) {
      const videoTL = new TimelineLite();
      const videoController = new ScrollMagic.Controller();
      const videoTween = TweenMax.fromTo(videoRef.current, 0.5, {scale: 0.7, y: 50}, {scale: 1, y: 0})
      videoTL.add(videoTween)
    
      new ScrollMagic.Scene({
        triggerElement: videoRef.current,
        duration: "95%",
        triggerHook: 1
      })
        .setTween(videoTL)
        .addTo(videoController);
    }
  })

  return (
    <VideoSectionStyled className="video-section">
      <div className="black-bg-container">
        <TextRevealAnimation addClass="quote-anim" skew>
          <div className="TextRevealItem">
            <p className="text">
            Il nostro lavoro si nutre costantemente di ispirazione. <br/>
Per questo non smettiamo mai di cercarla. Ovunque.
            </p>
          </div>
        </TextRevealAnimation>
        <div ref={videoRef} className="video-container anim">
          <video
              className="video-player"
              height="100%"
              width="100%"
              loop
              muted
              autoPlay
            >
              <source
                src={Showreel}
                type="video/mp4"
              />
            </video>
        </div>
      </div>
    </VideoSectionStyled>
  );
}

export default VideoSection;