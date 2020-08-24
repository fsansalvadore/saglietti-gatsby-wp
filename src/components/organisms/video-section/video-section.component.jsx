import React, { Component } from 'react';
import styled from 'styled-components'
import { TimelineLite } from "gsap/all";

import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import CustomEase from '../../particles/vendor/gsap/CustomEase'
import TextRevealAnimation from '../../particles/hooks/animationTextReveal'

import "scrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js";
import '../../particles/styles/homepage.styles.scss';

const VideoSectionStyled = styled.div`
  transform-style: preserve-3d;
`

gsap.registerPlugin(CSSRulePlugin, CustomEase);
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

class VideoSection extends Component {
  constructor(props){
		super(props);

		this.videoTL = new TimelineLite();
		// this.TextRevealTL = new TimelineLite();

		this.video = null;
	}

  componentDidMount() {
    // gsap
    const controller = new ScrollMagic.Controller();
  
    this.videoTL.from(this.video, 0.5, {scale: 0.75, y: 50})
  
    new ScrollMagic.Scene({
      triggerElement: this.video,
      duration: "95%",
      triggerHook: 1
    })
      .setTween(this.videoTL)
      .addTo(controller);
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
                  src={"SAGLIETTI_Showreel.mp4"}
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