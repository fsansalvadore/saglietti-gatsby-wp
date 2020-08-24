import React, { Component } from 'react';
import styled from 'styled-components'
import { TimelineLite } from "gsap/all";

import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import CustomEase from '../../particles/vendor/gsap/CustomEase'

import "scrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js";

import '../../particles/styles/homepage.styles.scss';

const VideoSectionStyled = styled.div`
  transform-style: preserve-3d;

  .TextRevealAnim {
    overflow: hidden;
    padding: 10px 0;
    transform: translate3d(0, 0, 10px) perspective(100px);
  }
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
  
    // Text on blue background animation
    this.videoTL.from(this.video, 0.5, {scale: 0.75, y: 50})
  
    new ScrollMagic.Scene({
      triggerElement: this.video,
      duration: "95%",
      triggerHook: 1
    })
      .setTween(this.videoTL)
      .addTo(controller);

    if (document.querySelectorAll(".TextRevealAnim").length !== 0) {
      document.querySelectorAll(".TextRevealAnim").forEach(TR => {
        const item = TR.querySelector('.TextRevealItem')
        let TextRevealTL = gsap.timeline();
        TextRevealTL.from(item, {
          duration: 1.5,
          opacity: 0,
          y: 50,
          skewY: 5,
          rotateX: "120deg",
          ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"),
        })

        new ScrollMagic.Scene({
          triggerElement: TR,
          triggerHook: 0,
          offset: -600,
          reverse: false
        })
        .setTween(TextRevealTL)
        .addTo(controller);
      });
    };
  }

  render() {
    return (
      <VideoSectionStyled className="video-section">
        <div className="black-bg-container">
          <div className="quote-anim TextRevealAnim">
            <div className="TextRevealItem">
              Breve citazione stilosa oppure titoletto.
            </div>
          </div>
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