import React, { Component } from 'react';
import styled from 'styled-components'
import { TweenLite, TimelineLite } from "gsap/all";

import { gsap } from "gsap";
import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import CustomEase from '../../particles/vendor/gsap/CustomEase'
import TextRevealAnimation from '../../particles/hooks/animationTextReveal'
import Showreel from '../../../assets/SAGLIETTI_Showreel.mp4'

import '../../particles/styles/homepage.styles.scss';

if(typeof window !== `undefined`) {
  gsap.registerPlugin(CSSRulePlugin, CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TimelineLite, TweenLite)
}
const VideoSectionStyled = styled.div`
transform-style: preserve-3d;
`

class VideoSection extends Component {
  constructor(props){
    super(props);
    
		this.videoTL = new TimelineLite();
		// this.TextRevealTL = new TimelineLite();
    
		this.video = null;
  }
  
  
  componentDidMount() {
    // gsap
    if(typeof window !== `undefined`) {
      const videoController = new ScrollMagic.Controller();
    
      this.videoTL.fromTo(this.video, 0.5, {scale: 0.75, y: 50}, {scale: 1, y: 0})
    
      new ScrollMagic.Scene({
        triggerElement: this.video,
        duration: "95%",
        triggerHook: 1
      })
        .setTween(this.videoTL)
        .addTo(videoController);
    }
  }

  render() {
    return (
      <VideoSectionStyled className="video-section">
        <div className="black-bg-container">
          <TextRevealAnimation addClass="quote-anim" skew>
            <div className="TextRevealItem">
              Breve citazione stilosa oppure titoletto.
            </div>
          </TextRevealAnimation>
          <div ref={video => this.video = video } className="video-container anim">
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
  };
}

export default VideoSection;