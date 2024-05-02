import React, { Component } from "react"

import { gsap } from "gsap"
import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { TweenMax, TweenLite, TimelineLite } from "gsap/all"
import CustomEase from "../vendor/gsap/CustomEase"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineLite, TweenLite)
}

class TextRevealAnimation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      children: props.children,
      addClass: props.addClass,
      skew: props.skew,
    }
  }

  componentDidMount() {
    if (typeof window !== `undefined`) {
      const TextRevealController = new ScrollMagic.Controller()

      document.querySelectorAll(".TextRevealAnim").forEach(txtReveal => {
        let item = txtReveal.querySelector(".TextRevealItem")
        let TextRevealTL = new TimelineLite()
        const itemTween = TweenMax.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
            skewY: this.state.skew ? 5 : 0,
          },
          {
            duration: 1.5,
            opacity: 1,
            y: 0,
            skewY: 0,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1",
            ),
          },
        )
        TextRevealTL.add(itemTween)

        new ScrollMagic.Scene({
          triggerElement: txtReveal,
          triggerHook: 0,
          offset: -600,
          reverse: false,
        })
          .setTween(TextRevealTL)
          .addTo(TextRevealController)
      })

      document.querySelectorAll(".fade-in").forEach(fadeInItem => {
        let TextRevealTL = new TimelineLite()
        const fadeInTween = TweenMax.fromTo(
          fadeInItem,
          1.5,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1",
            ),
          },
        )
        TextRevealTL.add(fadeInTween)

        new ScrollMagic.Scene({
          triggerElement: fadeInItem,
          triggerHook: 0,
          offset: -600,
          reverse: false,
        })
          .setTween(TextRevealTL)
          .addTo(TextRevealController)
      })
    }
  }

  render() {
    return (
      <div className={`TextRevealAnim ${this.state.addClass}`}>
        {this.state.children}
      </div>
    )
  }
}

export default TextRevealAnimation
